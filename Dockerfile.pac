ARG DISTRO_NAME
ARG DISTRO_VERSION
FROM $DISTRO_NAME:$DISTRO_VERSION

LABEL maintainer="javier@netmanagers.com.ar"

# Both args before the `FROM` are repeated here so that they can be used below, as required
# https://docs.docker.com/engine/reference/builder/#understand-how-arg-and-from-interact
ARG DISTRO_NAME
ARG DISTRO_VERSION
ARG SALT_INSTALL_METHOD
ARG SALT_VERSION
ARG PYTHON_VERSION
ARG EXTRA_PACKAGES=""
# Provide packages used by `kitchen-docker` to speed up testing
# These are now expected by the `ssf` customised `kitchen-docker` being used:
# - https://gitlab.com/saltstack-formulas/infrastructure/kitchen-docker/-/compare/master...ssf
ARG KITCHEN_DOCKER_PACKAGES="curl openssh openssl sudo"
ARG PKGS="${KITCHEN_DOCKER_PACKAGES} awk git net-tools procps-ng python-pip systemd udev ${EXTRA_PACKAGES}"
ARG SALT_REPO_URL=""

SHELL ["/bin/bash", "-x", "-o", "pipefail", "-c"]
RUN pacman --noconfirm -Sy archlinux-keyring \
 && pacman-db-upgrade \
 && pacman --noconfirm -Syu ${PKGS} \
    # Install Salt using the bootstrap script (removing the 10 seconds delay to cancel the bootstrap)
 && curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
    sed -e '/^\s\+echowarn "You have 10 seconds to cancel and stop the bootstrap process..."/,+2d' | \
    sh -s -- ${SALT_REPO_URL} -XUdfPD -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION \
    # Fix `pyzmq` requirements (only required for `3004`, remove once `3004.1` is available), see:
    # https://github.com/saltstack/salt/commit/070597e525bb7d56ffadede1aede325dfb1b73a4
    # https://github.com/saltstack/salt/pull/61163
    # https://bugs.archlinux.org/task/73095 -- for this new incarnation of the `pyzmq` requirements bug
 && if [ "${SALT_INSTALL_METHOD}" = "stable" ] && [ "${SALT_VERSION}" = "latest" ]; then \
      sed -i -e '/pyzmq<=20.0.0/d' /usr/lib/python3.10/site-packages/salt-3004-py3.10.egg-info/requires.txt; \
      sed -i -e '/\(pyzmq>\)=17.0.0/s//\119.0.2/' /usr/lib/python3.10/site-packages/salt-3004-py3.10.egg-info/requires.txt; \
    fi \
 && systemctl enable sshd \
 && systemctl disable salt-minion.service > /dev/null 2>&1 \
    # Similar to Fedora, enable the `ssh-rsa` keypair type since Kitchen
    # testing currently relies on this
 && echo "PubkeyAcceptedAlgorithms +ssh-rsa" | tee -a /etc/ssh/sshd_config \
    # Remove unnecessary getty and udev targets that result in high CPU usage when using
    # multiple containers with Molecule or Kitchen (https://github.com/ansible/molecule/issues/1104)
 && rm -rf /var/cache/{salt,pacman} \
           /usr/lib/systemd/system/systemd*udev* \
           /usr/lib/systemd/system/getty.target \
           /tmp/* \
 && (find / ! -path "/{proc,sys,dev}" -name "*.pyc"; \
     find / ! -path "/{proc,sys,dev}" -name "__pycache__"; \
     find /var/log -type f) \
    | grep -v ^/proc | xargs rm -rf \
    # Also obscure any `getty` binaries (https://github.com/moby/moby/issues/4040#issuecomment-339022455)
 && cp /bin/true /sbin/agetty
