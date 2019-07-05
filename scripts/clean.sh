#!/bin/bash

echo "**** PACKER CLEANUP"

rm -rf /var/cache/{salt,yum,apt,zypp} /tmp/*log /tmp/saltbootstrap.sh
find / -name "*pyc" -delete
find / -name "__pycache__" | xargs rm -rf
