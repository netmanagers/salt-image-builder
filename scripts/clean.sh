#!/bin/bash

echo "**** PACKER CLEANUP"

rm -rf /var/cache/{salt,yum,apt} /tmp/*log /tmp/saltbootstrap.sh
