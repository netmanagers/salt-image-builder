#!/bin/bash

echo "**** PACKER_BUILDER_TYPE is ${PACKER_BUILDER_TYPE} ****"
echo "               **** OS is ${OS} ****"
echo "               **** OS_VERSION is ${OS_VER} ****"
echo "               **** PY_VERSION is ${PY_VER} ****"

mkdir -p /run/sshd

COMMON_PKGS="udev git net-tools"

case ${OS} in
  debian|ubuntu)
    D_PKGS="${COMMON_PKGS} locales procps"
    apt-get update && apt-get install -y ${D_PKGS}
    echo "en_US.UTF-8 UTF-8" >> /etc//etc/locale.gen
    locale-gen
    ;;
  centos)
    if [ ${PY_VERSION} = "3" ]; then
      C_PKGS="${COMMON_PKGS} epel-release"
    fi
    yum -y update && yum -y install ${C_PKGS}
    yum -y update && yum -y install python36
    ;;
  fedora)
    dnf -y update && dnf -y install ${COMMON_PKGS}
    ;;
  opensuse)
    O_PKGS="${COMMON_PKGS} glibc-locale net-tools-deprecated"
    zypper refresh && zypper install -y ${O_PKGS}
    systemctl enable sshd
    ;;
esac
