#!/bin/sh

USERDIR="$1/$2"
APPDIR="$USERDIR/$3.git"
USER="$2"

sudo su - "$USER" -c "mkdir \"$APPDIR\""
sudo su - "$USER" -c "cd $APPDIR && git --bare init"
sudo su - "$USER" -c "cp $1/defaults/post-update.sample $APPDIR/hooks/post-update"
sudo sed -i s#__DEPLOY_DIR__#$4#g "$APPDIR/hooks/post-update"
sudo chmod g+rwx "$4"
sudo su - "$USER" -c "mkdir -p \"$4/$2\""
sudo chown -R "$USER".nodejs "$APPDIR" "$4/$2"
sudo su - "$USER" -c "cd \"$4/$2\" && git clone \"$APPDIR\" \"$3\""

exit 0