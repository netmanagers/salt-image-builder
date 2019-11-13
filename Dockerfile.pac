# syntax=docker/dockerfile:experimental

ARG DISTRO_NAME
ARG DISTRO_VERSION
FROM $DISTRO_NAME:$DISTRO_VERSION

LABEL maintainer="javier@netmanagers.com.ar"

ARG SALT_INSTALL_METHOD
ARG SALT_VERSION
ARG PYTHON_VERSION
ARG EXTRA_PACKAGES=""

ARG PKGS="udev git net-tools sudo curl $EXTRA_PACKAGES"

# FIXME! Find out the mount type=cache options for zyp-based distros
RUN pacman --noconfirm -Sy archlinux-keyring \
 && pacman-db-upgrade \
 && pacman --noconfirm -Syu ${PKGS}

RUN systemctl enable sshd

# The sed command is a quick fix for https://github.com/saltstack/salt-bootstrap/issues/1371
# No other stanza uses `python34` and current centos 7 & 8 have python3 packages so
# it should be OK to run it here.
# FIXME: modifying this here is really, really, really horrible and messy
RUN curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
    sudo sh -s -- -XUdfP -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION

RUN rm -rf /var/cache/{salt,pacman} \
 && (find / -name "*pyc" ; find / -name "__pycache__") |grep -v /proc | xargs rm -rf

