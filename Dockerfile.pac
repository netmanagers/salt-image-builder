ARG DISTRO_NAME
ARG DISTRO_VERSION
FROM $DISTRO_NAME:$DISTRO_VERSION

LABEL maintainer="javier@netmanagers.com.ar"

ARG SALT_INSTALL_METHOD
ARG SALT_VERSION
ARG PYTHON_VERSION
ARG EXTRA_PACKAGES=""

ARG PKGS="udev git net-tools sudo curl $EXTRA_PACKAGES"

RUN pacman --noconfirm -Sy archlinux-keyring \
 && pacman-db-upgrade \
 && pacman --noconfirm -Syu ${PKGS}

RUN systemctl enable sshd

RUN curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
    sudo sh -s -- -XUdfP -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION \
 && /bin/systemctl disable salt-minion.service > /dev/null 2>&1

RUN rm -rf /var/cache/{salt,pacman} \
 && (find / -name "*pyc" ; find / -name "__pycache__") |grep -v /proc | xargs rm -rf

# Remove unnecessary getty and udev targets that result in high CPU usage when using
# multiple containers with Molecule or Kitchen (https://github.com/ansible/molecule/issues/1104)
RUN rm -rf /usr/lib/systemd/system/systemd*udev* /usr/lib/systemd/system/getty.target
# Also obscure any `getty` binaries (https://github.com/moby/moby/issues/4040#issuecomment-339022455)
RUN cp /bin/true /sbin/agetty
