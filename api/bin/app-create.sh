#!/bin/sh

USERDIR="$1/$2"
APPDIR="$USERDIR/$3.git"
USER="appuser_$2"

sudo mkdir -p "$APPDIR"
sudo useradd "$USER"
sudo usermod -d "$USERDIR" "$USER"
sudo chown -R "$USER"."$USER" "$USERDIR"

if [ ! -d "$USERDIR/.ssh" ]; then
    sudo su - "$USER" -c 'mkdir .ssh && cd .ssh && ssh-keygen -t rsa -N "" -f id_rsa'
fi

if [ ! -f "$USERDIR/.ssh/authorized_keys" ]; then
    sudo su - "$USER" -c "touch $USERDIR/.ssh/authorized_keys"
fi

sudo su - "$USER" -c "cd $APPDIR && git --bare init"
sudo su - "$USER" -c "cp $1/defaults/post-update.sample $APPDIR/hooks/post-update"

exit 0