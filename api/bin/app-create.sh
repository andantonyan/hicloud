#!/bin/sh

USERDIR="$1/$2"
APPDIR="$USERDIR/$3.git"
USER="$2"

sudo su - "$USER" -c "mkdir \"$APPDIR\""
sudo su - "$USER" -c "cd $APPDIR && git --bare init"
sed -i s#__DEPLOY_DIR__#$4#g $1/defaults/post-update.sample
sudo su - "$USER" -c "cp $1/defaults/post-update.sample $APPDIR/hooks/post-update"
sudo chown -R "$USER".nodejs "$APPDIR"
sudo chmod g+rwx "$4"
sudo su - "$USER" -c "mkdir -p \"$4/$2\" && cd \"$4/$2\""
sudo chown "$USER".nodejs "$4/$2"
sudo su - "$USER" -c "git clone \"$APPDIR\" \"$3\""

exit 0