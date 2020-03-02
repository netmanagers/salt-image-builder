.. _readme:

Dockerfile and script to build salt images to speed up testing
==============================================================

.. image:: https://travis-ci.com/netmanagers/salt-image-builder.svg?branch=master

This repo holds a script to build docker images with salt-minion/salt-solo pre-installed
so testing `Salt formulas <https://github.com/saltstack-formulas/>`_ is faster/easier, as
all the basic requirements (salt, git, etc) are pre-installed in these images, allowing you
to skip all the bootstrap process in the image you use.

These are based in dockerhub upstream's images for each distro supported.

The images are tested with `Testinfra <https://testinfra.readthedocs.io/en/latest/>`_ before commiting,
to check salt got installed with the desired version and the dependencies are satisfied.

Images maintained
-----------------

The distros matrix is maintained for the lastest two, not EOL'ed, major distros versions.
If you need to build a version not supported in the distributed `.travis.yml` file, just modify
it (check the `env.jobs` section), add the combination that suits your needs and add or reuse a
suitable `Dockerfile.<os_package_manager>` to perform the build.

The EOLs can be checked here:

* Debian: https://wiki.debian.org/DebianReleases
* Centos: https://wiki.centos.org/About/Product
* Fedora: https://fedoraproject.org/wiki/End_of_life
* Opensuse: https://en.opensuse.org/Lifetime#openSUSE_Leap
* Ubuntu: https://wiki.ubuntu.com/Releases
* AmazonLinux: https://aws.amazon.com/about-aws/whats-new/2018/06/announcing-amazon-linux-2-with-long-term-support

Requirements
------------

This new version of the repo builds directly in `Travis-CI <https://travis-ci.com/netmanagers/salt-image-builder>`_.
There's a silly python script to allow building the images locally if you want to. To run it, you need

* Python3
* Docker (ce is OK)
* Latest Testinfra installed (>= 4.1.0)

Basic usage of the builder scripts
----------------------------------

1. Edit `.travis.yml`. Check the matrix of images to build in the section `env.jobs`. The generic format is


.. code-block::

   DN=distro_name DV=distro_version PI=packages_installer SV=salt_version SIM=salt_install_method PV=python_version EP="extra list of packages to install between quotes whitespace-separated"

like

.. code-block:: yaml

   - DN=amazonlinux DV=2 PI=yum SV=2018.3 SIM=stable PV=2 EP="yum-utils python-pip procps-ng"
   - DN=centos DV=8 PI=rpm SV=master SIM=git PV=3 EP="epel-release python3 python3-pip python3-devel openssl-devel swig"


empty lines or lines starting with # will be ignored (you can install travis gem locally and run travis list on the file to check syntax)

2. Run `./build.py` and take a coffee while building.

3. When it finishes, you can run `docker images` and you'll see the new images created, like

.. code-block::

   REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
   salt-py2/centos-7       2019.2              bea6a547bd78        6 minutes ago       475MB
   salt-py3/ubuntu-18.04   2019.2              b3660626bf24        11 minutes ago      329MB
   salt-py3/debian-9       2019.2              5bd9384b94ee        14 minutes ago      269MB

How to use the images
---------------------

Just edit your `kitchen.local.yml` file, and add the image you want to use, like

.. code-block:: yaml

  driver:
    name: docker
    use_sudo: false
    remove_images: true
    run_command: /lib/systemd/systemd
    privileged: true
    volume:
      - "/sys/fs/cgroup:/sys/fs/cgroup:ro"

   provisioner:
     salt_install: none

   platforms:
     - name: debian-9
       driver_config:
         image: salt-2019.2-py3:debian-9
     - name: ubuntu-16.04
       driver_config:
           image: salt-2018.3-py2:ubuntu-16.04

TODO
----

Lots. This is just an initial attempt. Any suggestion/contribution is welcomed :)
