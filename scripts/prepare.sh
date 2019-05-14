#!/bin/bash -x

echo "**** PACKER_BUILDER_TYPE is ${PACKER_BUILDER_TYPE} ****"
echo "               **** OS is ${OS} ****"
echo "               **** OS_VERSION is ${OS_VER} ****"
echo "               **** PY_VERSION is ${PY_VER} ****"

mkdir -p /run/sshd

# Adding some of the packages listed in https://github.com/test-kitchen/kitchen-docker/blob/master/lib/kitchen/driver/docker.rb
# To speed testing
COMMON_PKGS="udev git net-tools sudo curl"

case ${OS} in
  debian|ubuntu)
    D_PKGS="${COMMON_PKGS} locales procps openssh-server lsb-release"

    apt-get update && apt-get install -y ${D_PKGS}
    echo "en_US.UTF-8 UTF-8" >> /etc//etc/locale.gen
    locale-gen
    ;;
  centos)
    C_PKGS="${COMMON_PKGS} openssh-server openssh-clients which"

    if [ "${PY_VER}" = "3" ]; then
      C_PKGS="${C_PKGS} epel-release"
    fi

    yum -y update && yum -y install ${C_PKGS}

    if [ "${PY_VER}" = "3" ]; then
      yum -y update && yum -y install python36
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
    ln -s /etc/os-release /etc/SuSE-release
    zypper refresh && zypper install -y ${O_PKGS}
    systemctl enable sshd
    ;;
esac
