#!/bin/bash
#cd $PWD/../
cd /var/HiCloudRepos/
REPO=`find . -type d -name "$1.git"`
USER=`stat -c '%U' "$REPO"`
PORT=$((`id -u $USER` + 1000))
echo $PORT
exit 0
