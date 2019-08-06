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
    C_PKGS="${COMMON_PKGS} openssh-server openssh-clients which epel-release"

    yum -y update && yum -y install ${C_PKGS}

    if [ "${PY_VER}" = "3" ]; then
      if [ "${SALT_VER}" = "develop" ]; then
        PY_PKGS="python34 python34-pip python34-devel openssl-devel gcc-g++ zeromq zeromq-devel"
        # The bootstrapper script only installs python3.4 packages
        # and searches for *3 binaries, which do not exist on the python3.4 packages
        ln -s /usr/bin/python3.4 /usr/bin/python3
        ln -s /usr/bin/pip3.4 /usr/bin/pip3
      else
        PY_PKGS="python36 python36-pip"
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
    F_PKGS="${COMMON_PKGS} openssh-server openssh-clients which findutils"

    if [ "${PY_VER}" = "3" ]; then
      F_PKGS="${F_PKGS} python3-pip"
    else
      F_PKGS="${F_PKGS} python2-pip"
    fi

    dnf -y update && dnf -y install ${F_PKGS}
    ;;
  opensuse*)
    O_PKGS="${COMMON_PKGS} glibc-locale net-tools openssh which"

    if [ "${PY_VER}" = "3" ]; then
      O_PKGS="${O_PKGS} python3-pip"
    else
      O_PKGS="${O_PKGS} python-pip"
    fi

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
