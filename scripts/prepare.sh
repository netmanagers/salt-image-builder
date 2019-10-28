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
  archlinux*)
    A_PKGS="${COMMON_PKGS} openssl openssh awk procps python2-pip"
    pacman --noconfirm -Sy archlinux-keyring
    pacman-db-upgrade
    pacman --noconfirm -Syu ${A_PKGS}
    systemctl enable sshd
    ;;
  debian|ubuntu)
    D_PKGS="${COMMON_PKGS} locales procps openssh-server lsb-release"
    if [ "${PY_VER}" = "3" ]; then
      D_PKGS="${D_PKGS} python3-pip"
    else
      D_PKGS="${D_PKGS} python-pip"
    fi

    apt-get update && apt-get install -y ${D_PKGS}
    # Use @vutny's suggestion in https://github.com/saltstack-formulas/postgres-formula/pull/269#issuecomment-492597286
    rm -f /etc/default/locale /etc/locale.gen
    echo 'locales locales/locales_to_be_generated multiselect en_US.UTF-8 UTF-8' | debconf-set-selections -
    echo 'locales locales/default_environment_locale select en_US.UTF-8' | debconf-set-selections -
    dpkg-reconfigure -f noninteractive locales
    ;;
  centos)
    # This is a quick fix for https://github.com/saltstack/salt-bootstrap/issues/1371
    # No other stanza uses `python34` and current centos 7 & 8 have python3 packages
    # FIXME: modifying this here is really, really, really horrible and messy
    sed -i "s/python34/python3/g" /tmp/saltbootstrap.sh

    C_PKGS="${COMMON_PKGS} openssh-server openssh-clients which epel-release"

    yum -y update && yum -y install ${C_PKGS}

    if [ "${PY_VER}" = "3" ]; then
      PY_PKGS="python3 python3-pip python3-devel openssl-devel swig"
      if [ "${OS_VER}" = "7" ]; then
        PY_PKGS="${PY_PKGS} gcc-g++ zeromq zeromq-devel"
      fi
    else # py2
      if [ "${OS_VER}" = "7" ]; then
        PY_PKGS="python2-pip"
      else # centos6
        PY_PKGS="python-pip"
      fi
    fi
    yum -y update && yum -y install ${PY_PKGS}
    ;;
  fedora)
    F_PKGS="${COMMON_PKGS} openssh-server openssh-clients which findutils glibc-langpack-en"

    if [ "${PY_VER}" = "3" ]; then
      F_PKGS="${F_PKGS} python3-pip"
    else
      F_PKGS="${F_PKGS} python2-pip"
    fi

    dnf -y update && dnf -y install ${F_PKGS}
    ;;
  opensuse*)
    O_PKGS="${COMMON_PKGS} glibc-locale net-tools openssh which net-tools-deprecated python-xml"

    if [ "${PY_VER}" = "3" ]; then
      O_PKGS="${O_PKGS} python3-pip"
    else
      O_PKGS="${O_PKGS} python-pip"
    fi

    # https://github.com/inspec/train/issues/377
    # https://github.com/inspec/train/pull/505
    if [ ! -e /etc/SuSE-release ]; then
      ln -s /etc/os-release /etc/SuSE-release
    fi
    zypper refresh && zypper install -y ${O_PKGS}
    systemctl enable sshd
    ;;
  amazonlinux)
    # A_PKGS="${COMMON_PKGS} openssh-server openssh-clients which epel-release yum-utils"
    A_PKGS="${COMMON_PKGS} yum-utils"

    if [ "${PY_VER}" = "3" ]; then
      A_PKGS="${A_PKGS} python3-pip"
    else
      A_PKGS="${A_PKGS} python-pip"
    fi

    yum -y update && yum -y install ${A_PKGS}
    ;;
esac
