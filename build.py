#!/usr/bin/env python3

"""
usage: %prog
Build different docker images with salt-minion pre-installed to ease testing

You need to provide a CSV file, with the following parameters

DISTRO_NAME, DISTRO_VERSION, SALT_VERSION, PYTHON VERSION
like

debian,9,2019.2,3
fedora,28,2018.3,2
"""
import csv
import subprocess

SALT_BS = 'https://bootstrap.saltstack.com'

# Get the salt bootstrapper here, to download it just once for later use
subprocess.run([
                "curl",
                "-L",
                "-o",
                "/tmp/saltbootstrap.sh",
                SALT_BS
              ])

# Loop in the build matrix and build each image
with open("matrix.csv") as f:
  reader = csv.reader(f)
  list = list(reader)
  print(list)
  for line in list:
    print(line)
    subprocess.run([
      "packer",
      "build",
      "-var",
      "os=" + line[0],
      "-var",
      "os_ver=" + line[1],
      "-var",
      "salt_ver=" + line[2],
      "-var",
      "salt_install_method=" + line[3],
      "-var",
      "py_ver=" + line[4],
      "salt-testing-docker.json"
    ])

