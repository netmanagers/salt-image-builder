#!/usr/bin/env python3

"""
usage: %prog
Build different docker images with salt-minion pre-installed to ease testing

This script allows you to build locally, pulling the images matrix from the .gitlab-ci.yml file.

Check that file for details.
"""
import yaml
import os
import subprocess

gitlab_ci_file = open(".gitlab-ci.yml", "r")
# travis_yaml = yaml.load(travis_file, Loader=yaml.FullLoader)
gitlab_ci_yaml = yaml.load(gitlab_ci_file, Loader=yaml.FullLoader)

builds = {}

for job_key, job_data in gitlab_ci_yaml.items():
    # remove anything without an "extends"
    if "extends" in job_data:
        if "variables" in job_data and "EP" in job_data["variables"]:
            builds[job_key] = job_data

print(builds)

for job_key, job_data in builds.items():
    # # Extra packages lines require some extra processing
    print(job_data)

    DN = job_data["variables"]["DN"]
    DV = job_data["variables"]["DV"]
    PI = job_data["variables"]["PI"]
    PV = job_data["variables"]["PV"]
    SIM = job_data["variables"]["SIM"]
    SV = job_data["variables"]["SV"]
    SVB = job_data["variables"]["SVB"]
    # Extra packages lines require some extra processing
    EP = job_data["variables"]["EP"]

    build_script = (
        "/tmp/salt-docker-builder-script-"
        + DN.replace("/", "-")
        + DV
        + "-"
        + PI
        + "-"
        + PV
        + "-"
        + SIM
        + "-"
        + SV
    )

    with open(build_script, "w") as script:
        script.write("#!/bin/bash\n")
        script.write('export DN="' + DN + '"\n')
        script.write('export DV="' + DV + '"\n')
        script.write('export SIM="' + SIM + '"\n')
        script.write('export SV="' + SV + '"\n')
        script.write('export PV="' + PV + '"\n')
        script.write('export EP="' + EP.replace('"', "") + '"\n')
        script.write('export PI="' + PI + '"\n')
        script.write('export SVB="' + SVB + '"\n')
        script.write("export DOCKER_DEFAULT_PLATFORM=linux/amd64\n")

        for var_name, var_val in gitlab_ci_yaml[".build_image_failure_forbidden"][
            "variables"
        ].items():
            script.write("export " + var_name + '="' + var_val + '"\n')

        for install_line in gitlab_ci_yaml[".build_image_failure_forbidden"][
            "before_script"
        ]:
            script.write(install_line + "\n")

        for install_line in gitlab_ci_yaml[".build_image_failure_forbidden"]["script"]:
            script.write(install_line + "\n")

        script.close()

    os.chmod(build_script, 0o755)
    subprocess.run(build_script)
