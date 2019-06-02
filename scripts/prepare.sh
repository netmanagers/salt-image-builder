#!/bin/bash -x

_exit_handler() {
  local rc="$?"
  trap - EXIT
  if [ "${rc}" -ne 0 ]; then
    echo "Error occurred (${rc}) while running $0 at line $1 : ${BASH_COMMAND}"
  fi
  exit "$rc"
}

trap '_exit_handler ${LINENO}' EXIT ERR

echo "**** PACKER_BUILDER_TYPE is ${PACKER_BUILDER_TYPE} ****"
echo "               **** OS is ${OS} ****"
echo "               **** OS_VERSION is ${OS_VER} ****"
echo "               **** PY_VERSION is ${PY_VER} ****"
echo "               **** SALT_VERSION is ${SALT_VER} ****"

mkdir -p /run/sshd

# Adding some of the packages listed in https://github.com/test-kitchen/kitchen-docker/blob/master/lib/kitchen/driver/docker.rb
# To speed testing
COMMON_PKGS="udev git net-tools sudo curl"

case ${OS} in
  debian|ubuntu)
    D_PKGS="${COMMON_PKGS} locales procps openssh-server lsb-release"

    apt-get update && apt-get install -y ${D_PKGS}
    # Use @vutny's suggestion in https://github.com/saltstack-formulas/postgres-formula/pull/269#issuecomment-492597286
    rm -f /etc/default/locale /etc/locale.gen
    echo 'locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8' | debconf-set-selections -
    echo 'locales locales/default_environment_locale select en_US.UTF-8' | debconf-set-selections -
    dpkg-reconfigure -f noninteractive locales
    ;;
  centos)
    C_PKGS="${COMMON_PKGS} openssh-server openssh-clients which"

    if [ "${PY_VER}" = "3" ]; then
      C_PKGS="${C_PKGS} epel-release"
    fi

    yum -y update && yum -y install ${C_PKGS}

    if [ "${PY_VER}" = "3" ]; then
      if [ "${SALT_VER}" = "develop" ]; then
        PY_PKGS="python34 python34-pip python34-devel openssl-devel gcc-g++ zeromq zeromq-devel"
        # The bootstrapper script only installs python3.4 packages
        # and searches for python3 binary, which does not exist on the python3.4 package
        ln -s /usr/bin/python3.4 /usr/bin/python3
      else
        PY_PKGS="python36"
      fi
      yum -y update && yum -y install ${PY_PKGS}
    fi
    ;;
  fedora)
    F_PKGS="${COMMON_PKGS} openssh-server openssh-clients which"

    dnf -y update && dnf -y install ${F_PKGS}
    ;;
  opensuse*)
    O_PKGS="${COMMON_PKGS} glibc-locale net-tools openssh which"

    if [ "${OS_VER}" = "15" ]; then
      O_PKGS="${O_PKGS} net-tools-deprecated python-xml"
    fi

    # Edit zypper repos (see https://github.com/netmanagers/salt-image-builder/issues/4)
    cd /etc/zypp/repos.d/
    ls | while read F; do
      sed -i "s#download.opensuse.org#mirror.23media.com/opensuse#g" "${F}"
    done

    # https://github.com/inspec/train/issues/377
    if [ ! -e /etc/SuSE-release ]; then
      ln -s /etc/os-release /etc/SuSE-releasea
    fi
    zypper refresh && zypper install -y ${O_PKGS}
    systemctl enable sshd
    ;;
esac
