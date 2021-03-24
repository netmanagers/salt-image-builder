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
ARG BUILD_PACKAGES="binutils fakeroot tar"
# Provide packages used by `kitchen-docker` to speed up testing
# These are now expected by the `ssf` customised `kitchen-docker` being used:
# - https://gitlab.com/saltstack-formulas/infrastructure/kitchen-docker/-/compare/master...ssf 
ARG KITCHEN_DOCKER_PACKAGES="curl openssh openssl sudo"
ARG PKGS="${KITCHEN_DOCKER_PACKAGES} awk git net-tools procps systemd udev ${EXTRA_PACKAGES} ${BUILD_PACKAGES}"
ARG BUILD_USER="bin"

SHELL ["/bin/bash", "-x", "-o", "pipefail", "-c"]
RUN pacman --noconfirm -Sy archlinux-keyring \
 && pacman-db-upgrade \
 && if [ "${PYTHON_VERSION}" = "2" ] || [ "${SALT_INSTALL_METHOD}" = "stable" ]; then \
      pacman --noconfirm -Syu ${PKGS}; \
      curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
      sh -s -- -XUdfP -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION; \
    else \
      pacman --noconfirm -Syu ${PKGS} ${BUILD_PACKAGES}; \
      # Build using the AUR `salt-py3` package provided by zer0def <zer0def@github>
      # This section is based upon the diff provided by zer0def during a conversation
      # in the Slack #irc channel: https://freenode.logbot.info/salt/20201027#c5608179-c5610234
      # Set the exports for installing the specific version of Salt
      export PKGVER="${SALT_VERSION}"; \
      # Note that the `.0` versions will be sent through to this file without the `.0`.
      # Only keeping the last two releases for each version
      if [ "${SALT_VERSION}" = "3002.6" ]; then \
        export PKGSUM_SHA512=1c0c4d3c925202809d65566da15bf33ec01830ab9da3ad8e98d06bb0626b3c084e1adfb8e31f1e43baaf6e307803e788b3d05c415a1a8e08e61be788a61503f5; \
        export PKGSUM_B2=a4c607131f1676ce263a1301745feaded5a699dd28d2e31862064e08452214c2c6c5791f476288b951a0e96c65574b209b1544ecf503698acf31e190e5d44325; \
      elif [ "${SALT_VERSION}" = "3002.5" ]; then \
        export PKGSUM_SHA512=dda2caa338f646ec51d2de6b0df10fbb27eceddbe8c797ae192b9ef1312d566ae71a243a3a95918fa375b125089aa29a73b1b908c5cc1b0451dccb582a4978a1; \
        export PKGSUM_B2=baa90bb0caea572dfbe12d92fb488ee0c4adef9a07221f394009cd43a62ffef18c57f2e7cdcfcd923807c7a3d02ce6833480f74d70250c29d311420f30514300; \
      elif [ "${SALT_VERSION}" = "3001.7" ]; then \
        export PKGSUM_SHA512=5414298cf9e3e198980bef5eec856290b1b73d5c4fbd01fbf43a4f4c3757daa86d54fcc4ed93a23e3ee224c2968941d26937ea2a6201bde47f2b8ec8918838e4; \
        export PKGSUM_B2=6141cd62edb67f8520134420b6fddc201dc8222bd24f4387c20e42f72157c108940d219336889577341b86b195f96d55a64b9ac88006adea656dc10368131d45; \
      elif [ "${SALT_VERSION}" = "3001.6" ]; then \
        export PKGSUM_SHA512=e45c9cfddb64ab1c9d66b6b6b3e5ff8d9010c01307161e5013140b4362ee630cf912ab153d1afa72f56d18fc5353293b2f4b449caf8ee384d1e93204d490bf4c; \
        export PKGSUM_B2=00e7674452e9d61c3cd487d27a3a1f3435c6b12dcc89008aa63c96814957b6ce8654f4d4d51dbce7b14027f0cee66fd2ea9602f6be18bf2f4beac11ae164f89f; \
      elif [ "${SALT_VERSION}" = "3000.9" ]; then \
        export PKGSUM_SHA512=94214f20a8a080ebdcbb7e3351f60a466c3a92cc85d177c2ea677192a63e58b0f9cacfb1af04e14022a7ac570ebd0b931722d1d001a7655dcd7502813c29a092; \
        export PKGSUM_B2=b76c166363b0b0fd3e3aa4b5306ba8280a2c99fbc7fd9866d957406bba8e6fcc03b769b53dbb80b115f9fa9f1fdc93e1eb257f4bf04283e414a309c16e4f078f; \
      elif [ "${SALT_VERSION}" = "3000.8" ]; then \
        export PKGSUM_SHA512=a18d5bea3b3835f83d5b1e5315990d83f6c58c36df5589d5de0f8cc3a46db4c960b58032e29d56841a160b9b170cdbb81bca38dbbd72ccb5866ccc8a7da6e800; \
        export PKGSUM_B2=df306669ba11dd650621222ff9c69f5a6e16b6f431e9d93e6712ee95da43091bfe28416fe0d71988ed9ee70cb347755b779a356c50fa59c63c67a874ed1906f4; \
      fi; \
      # Perform the build
      echo "${BUILD_USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/salt-build; \
      su -s /bin/sh "${BUILD_USER}" -c "cd /tmp && curl -sSL https://aur.archlinux.org/cgit/aur.git/snapshot/salt-py3.tar.gz | tar xz && cd salt-py3 && makepkg --noconfirm -Crsf && cd .."; \
      pacman --noconfirm -U /tmp/salt-py3/salt-py3-*.pkg.tar*; \
      pacman --noconfirm -Rs ${BUILD_PACKAGES}; \
      rm -rf /etc/sudoers.d/salt-build /tmp/salt-py3/; \
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
