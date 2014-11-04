#!/bin/sh

USERDIR="$1/$2"
USER="appuser_$2"

sudo mkdir "$USERDIR"
sudo useradd "$USER"
sudo usermod -d "$USERDIR" "$USER"
sudo chown -R "$USER"."$USER" "$USERDIR"

TESTUSER=false
getent passwd "$USER" >/dev/null 2>&1 && TESTUSER=true

if [ ${TESTUSER} ]; then
    echo "SYS_USER_EXISTS"
    exit 1
fi

if [ ! -d "$USERDIR/.ssh" ]; then
    sudo su - "$USER" -c 'mkdir .ssh && cd .ssh && ssh-keygen -t rsa -N "" -f id_rsa'
fi

if [ ! -f "$USERDIR/.ssh/authorized_keys" ]; then
    sudo su - "$USER" -c "touch $USERDIR/.ssh/authorized_keys"
fi

exit 0