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
 && pacman --noconfirm -Syu ${PKGS} \
 && systemctl enable sshd \
 && if [ "${PYTHON_VERSION}" != "3" ]; then \
      curl -L https://raw.githubusercontent.com/saltstack/salt-bootstrap/develop/bootstrap-salt.sh | \
      sh -s -- -XUdfP -x python$PYTHON_VERSION $SALT_INSTALL_METHOD $SALT_VERSION; \
    else \
      # Build using the AUR `salt-py3` package provided by zer0def <zer0def@github>
      # This section is based upon the diff provided by zer0def during a conversation
      # in the Slack #irc channel: https://freenode.logbot.info/salt/20201027#c5608179-c5610234

      # Set the exports for installing the specific version of Salt
      export PKGVER="${SALT_VERSION}"; \
      # Note that the `.0` versions will be sent through to this file without the `.0`.
      if [ "${SALT_VERSION}" = "3002.5" ]; then \
        export PKGSUM_SHA512=dda2caa338f646ec51d2de6b0df10fbb27eceddbe8c797ae192b9ef1312d566ae71a243a3a95918fa375b125089aa29a73b1b908c5cc1b0451dccb582a4978a1; \
        export PKGSUM_B2=baa90bb0caea572dfbe12d92fb488ee0c4adef9a07221f394009cd43a62ffef18c57f2e7cdcfcd923807c7a3d02ce6833480f74d70250c29d311420f30514300; \
      elif [ "${SALT_VERSION}" = "3002.2" ]; then \
        export PKGSUM_SHA512=0f617a07475347b1bb0d1c6059de541e102103182820dfd6f64f4c281d660e68358eb1ab7171a637e16cef9fea2517c8356df9c449f9bbc92538aa86c316f652; \
        export PKGSUM_B2=b26895ababc8551e01baa806c5a0e41dab9a379e47d2289b5c3c529ef762c69631d7ed8b32339ec66c3929c5883782131eb56d1bfbcc743829c4f0199a900ca1; \
      elif [ "${SALT_VERSION}" = "3002.1" ]; then \
        export PKGSUM_SHA512=8fc02d0b47dad60f96eb4442b0e8a31f04d796f12b845c8142135593af4c7ea9c2d9335a3f520f8858951f87b0e8cc6be70d383fde2d93a6d529e077bcc87114; \
        export PKGSUM_B2=d084dc650b8bc92b4ebdb145a41a39bfbd034064fad65e364260eca84d7105fb645ad8f6cea2cc1b6affb1abf21a9858ab6fb526eaf4ecd8f76c70d1384c7edc; \
      elif [ "${SALT_VERSION}" = "3002" ]; then \
        export PKGSUM_SHA512=7a3ed78b301e9c1ef65c8e6aeeaebc2376b3942e94e38b0591860fa1d9213c6c0f85db4d932b4c7c9d20717027a686690973d0dfd2aff17f44abae0ec0e97d31; \
        export PKGSUM_B2=7463cfe558515697177fedb25fdf9f2e2819b62e3a96c8196b4243a4f2a59a202ac5a3869138b2df00fb47238329ba102396b464379f09d2a79c8c0a672638fb; \
      elif [ "${SALT_VERSION}" = "3001.6" ]; then \
        export PKGSUM_SHA512=e45c9cfddb64ab1c9d66b6b6b3e5ff8d9010c01307161e5013140b4362ee630cf912ab153d1afa72f56d18fc5353293b2f4b449caf8ee384d1e93204d490bf4c; \
        export PKGSUM_B2=00e7674452e9d61c3cd487d27a3a1f3435c6b12dcc89008aa63c96814957b6ce8654f4d4d51dbce7b14027f0cee66fd2ea9602f6be18bf2f4beac11ae164f89f; \
      elif [ "${SALT_VERSION}" = "3001.4" ]; then \
        export PKGSUM_SHA512=b7f343c65917280a96d8a3eaa6b508121b11b9f9b0bfffa5b4c79af0023bdecf4581f76014847d97f48d9677edb6f632adec3850153c3048c3114128a250b84b; \
        export PKGSUM_B2=cc33b29b0da9cfaae22726b2b471245880aafa106187b531872a9ae5ee773a94e0d550a68b11b74826bc0b35197a311f690535f2280931ccb5050275ad967c2d; \
      elif [ "${SALT_VERSION}" = "3001.3" ]; then \
        export PKGSUM_SHA512=a3c0f019fbe1f1edac11af291667f06597dbf4badeb0026107dcab4937efcb306ca6d3ba20195ff9fea5ee7a995db1c3a79236de3e990fc809c305e7f05e1c9d; \
        export PKGSUM_B2=50d073d39826fb15cb424df3e55c2308dd18391c13a5c4a3fb01c1e1ecd8636dd45fdf34b1937563d069e51141fc40f48f77eaec6b1e1d6f9802418e611b20b1; \
      elif [ "${SALT_VERSION}" = "3001.1" ]; then \
        export PKGSUM_SHA512=d59b6c3580d3379192f36e462385c74b53b0b385e63b3db7734003d0a71df8f88593a59eeccd86b1dc15800e46d050094e7a88f2636673770ddc952d0110ca29; \
        export PKGSUM_B2=3088955a07b6ff95588f5b6235e0bae9cea366e957e026bacd228af9f1ed500f88f7fb543833f2398d64fe7e4546f0f29d7c65362464097bf89424174e76c954; \
      elif [ "${SALT_VERSION}" = "3000.8" ]; then \
        export PKGSUM_SHA512=a18d5bea3b3835f83d5b1e5315990d83f6c58c36df5589d5de0f8cc3a46db4c960b58032e29d56841a160b9b170cdbb81bca38dbbd72ccb5866ccc8a7da6e800; \
        export PKGSUM_B2=df306669ba11dd650621222ff9c69f5a6e16b6f431e9d93e6712ee95da43091bfe28416fe0d71988ed9ee70cb347755b779a356c50fa59c63c67a874ed1906f4; \
      elif [ "${SALT_VERSION}" = "3000.6" ]; then \
        export PKGSUM_SHA512=739e3671766c45a0ef1eb45933c7f00f14586e91f4c4a79cbed913a48961a48baee853206ba569491756e8a872d22f3635eb6bc1a366020e551c567b2334c508; \
        export PKGSUM_B2=5a532a6915b331fb532dc6e1651cf8fca3e1a5e9f29f6d75260fdb1162dbfeec755c65f7c6fc28b1cc7dc3ace978547830af31aafc1eee8419bbc7e695725787; \
      fi; \
      # Perform the build
      echo "${BUILD_USER} ALL=(ALL) NOPASSWD: ALL" > /etc/sudoers.d/salt-build; \
      su -s /bin/sh "${BUILD_USER}" -c "cd /tmp && curl -sSL https://aur.archlinux.org/cgit/aur.git/snapshot/salt-py3.tar.gz | tar xz && cd salt-py3 && makepkg --noconfirm -Crsf && cd .."; \
      pacman --noconfirm -U /tmp/salt-py3/salt-py3-*.pkg.tar*; \
      pacman --noconfirm -Rs ${BUILD_PACKAGES}; \
      rm -rf /etc/sudoers.d/salt-build /tmp/salt-py3/; \
    fi \
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
