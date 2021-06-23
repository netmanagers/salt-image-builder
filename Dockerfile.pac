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
ARG PKGS="${KITCHEN_DOCKER_PACKAGES} awk git net-tools procps systemd udev ${EXTRA_PACKAGES}"

SHELL ["/bin/bash", "-x", "-o", "pipefail", "-c"]
RUN pacman --noconfirm -Sy archlinux-keyring \
 && pacman-db-upgrade \
 && pacman --noconfirm -Syu ${PKGS} \
 && curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
    sh -s -- -XUdfPD -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION \
    # Use temporary workaround of downgrading Jinja2 for images built using `git`
    # See https://github.com/saltstack/salt/issues/60188
 && if [ "${SALT_INSTALL_METHOD}" = "git" ] && [ "${PYTHON_VERSION}" = "3" ]; then \
      pip3 install --no-cache-dir Jinja2==2.11.3; \
    else \
      pacman --noconfirm -U https://archive.archlinux.org/packages/p/python-jinja/python-jinja-2.11.3-2-any.pkg.tar.zst; \
    fi \
    # Use temporary workaround of installing `contextvars` for latest stable (`3003.1`)
    # See https://bugs.archlinux.org/task/71344
 && if [ "${SALT_INSTALL_METHOD}" = "stable" ]; then \
      pip3 install --no-cache-dir contextvars==2.4; \
    fi \
 && systemctl enable sshd \
 && systemctl disable salt-minion.service > /dev/null 2>&1 \
    # Remove unnecessary getty and udev targets that result in high CPU usage when using
    # multiple containers with Molecule or Kitchen (https://github.com/ansible/molecule/issues/1104)
 && rm -rf /var/cache/{salt,pacman} \
           /usr/lib/systemd/system/systemd*udev* \
           /usr/lib/systemd/system/getty.target \
 && (find / ! -path "/{proc,sys,dev}" -name "*.pyc"; \
     find / ! -path "/{proc,sys,dev}" -name "__pycache__"; \
     find /var/log -type f) \
    | grep -v ^/proc | xargs rm -rf \
    # Also obscure any `getty` binaries (https://github.com/moby/moby/issues/4040#issuecomment-339022455)
 && cp /bin/true /sbin/agetty
