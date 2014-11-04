#!/bin/sh

USERDIR="$1/$2"
USER="appuser_$2"

sudo mkdir "$USERDIR"
sudo useradd "$USER"
sudo usermod -d "$USERDIR" "$USER"
sudo chown -R "$USER".nodejs "$USERDIR"

if [ ! -d "$USERDIR/.ssh" ]; then
    sudo su - "$USER" -c 'mkdir .ssh && cd .ssh && ssh-keygen -t rsa -N "" -f id_rsa'
fi

if [ ! -f "$USERDIR/.ssh/authorized_keys" ]; then
    sudo su - "$USER" -c "touch $USERDIR/.ssh/authorized_keys"
fi

exit 0