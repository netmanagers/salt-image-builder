#!/usr/bin/env python3

"""
usage: %prog
Build different docker images with salt-minion pre-installed to ease testing

This script allows you to build locally, pulling the images matrix from the .travis.yml file.

Check that file for details.
"""
import yaml
import os
import subprocess

travis_file = open('.travis.yml', 'r')
#travis_yaml = yaml.load(travis_file, Loader=yaml.FullLoader)
travis_yaml = yaml.load(travis_file)

for job_line in travis_yaml['env']['jobs']:
    DN, DV, PI, SV, SIM, PV, *EP = job_line.split()

    DN = DN.split('=')[1]
    DV = DV.split('=')[1]
    PI = PI.split('=')[1]
    PV = PV.split('=')[1]
    SV = SV.split('=')[1]
    SIM = SIM.split('=')[1]
    # Extra packages lines require some extra processing
    EP = ' '.join(EP).split('=')[1]

    build_script = '/tmp/salt-docker-builder-script-' + DN.replace('/','-') + DV + '-' + PI + '-' + PV + '-' + SV + '-' + SIM
    with open(build_script, 'w') as script:
      script.write( '#!/bin/bash\n')
      script.write( 'export DN="' + DN + '"\n')
      script.write( 'export DV="' + DV + '"\n')
      script.write( 'export SV="' + SV + '"\n')
      script.write( 'export SIM="' + SIM + '"\n')
      script.write( 'export PV="' + PV + '"\n')
      script.write( 'export EP="' + EP.replace('"','') + '"\n')
      script.write( 'export PI="' + PI + '"\n')

      for install_line in travis_yaml['before_install']:
        script.write(install_line + '\n')
      for install_line in travis_yaml['install']:
        script.write(install_line + '\n')
      for install_line in travis_yaml['script']:
        script.write(install_line + '\n')

    os.chmod(build_script, 0o755)
    subprocess.run(build_script)
