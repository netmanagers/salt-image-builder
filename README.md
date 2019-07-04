Packer script to build salt images to speed up testing
======================================================

This repo holds a script to build docker images with salt-minion/salt-solo pre-installed
so testing [Salt formulas](https://github.com/saltstack-formulas/) is faster/easier, as
all the basic requirements (salt, git, etc) is pre-installed in these images and allows you
to skip all the bootstrap process in the image you use.

These are based in upstream's images for each distro supported.

The images are tested with [`inspec`](https://www.inspec.io/) before commiting, to check 
salt got installed and it's the desired version.

Images maintained
-----------------

The distros matrix is maintained for the lastest two, not EOL'ed, major distros versions.
If you need to build a version not supported in the distributed `matrix.csv` file, just modify
it and add the combination that suits your needs.

The EOLs can be checked here:

* Debian: https://wiki.debian.org/DebianReleases
* Centos: https://wiki.centos.org/About/Product
* Fedora: https://fedoraproject.org/wiki/End_of_life
* Opensuse: https://en.opensuse.org/Lifetime#openSUSE_Leap
* Ubuntu: https://wiki.ubuntu.com/Releases

Requirements
------------

* Python3: the initial script is a silly python script to ease the process.
* Packer: https://www.packer.io/downloads.html, a binary you can just download and copy
  somewhere in your $PATH
* Docker: packer requires docker installed and running in the machine where you are going to
  build the images.

Basic usage of the builder scripts
----------------------------------

1. Edit `matrix.csv`. This is the matrix of VMs to build. The format is

```
DISTRO_NAME, DISTRO_VERSION, SALT_VERSION, PYTHON_VERSION
```

like

```
debian,9,2019.2,3
fedora,28,2018.3,2
```

empty lines or lines starting with # will be ignored

2. Run `./build.py` and take a coffee while building.

3. When it finishes, you can run `docker images` and you'll see the new images created, like

```
REPOSITORY              TAG                 IMAGE ID            CREATED             SIZE
salt-py2/centos-7       2019.2              bea6a547bd78        6 minutes ago       475MB
salt-py3/ubuntu-18.04   2019.2              b3660626bf24        11 minutes ago      329MB
salt-py3/debian-9       2019.2              5bd9384b94ee        14 minutes ago      269MB
```

How to use the images
---------------------

Just edit your `kitchen.local.yml` file, and add the image you want to use, like

```yaml
provisioner:
  salt_install: none

platforms:
  - name: debian-9
    driver_config:
      image: salt-py3/debian-9:2019.2
  - name: ubuntu-16.04
    driver_config:
        image: salt-py2/ubuntu-16.04:2018.3
```

TODO
----

Lots. This is just an initial attempt. Any suggestion is welcome :)
