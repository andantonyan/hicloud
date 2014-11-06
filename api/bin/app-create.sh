#!/bin/sh

APPDIR="$1"
USER="$2"
APPNAME="$3"
WWWDIR="$4"

USERDIR="$APPDIR/$USER"
USERAPPDIR="$USERDIR/$APPNAME.git"
USERWWWDIR="$WWWDIR/$USER"

sudo su - "$USER" -c "mkdir \"$USERAPPDIR\""
sudo su - "$USER" -c "cd $USERAPPDIR && git --bare init"
sudo su - "$USER" -c "cp $APPDIR/defaults/post-update.sample $USERAPPDIR/hooks/post-update"
sudo sed -i s#__DEPLOY_DIR__#$WWWDIR#g "$USERAPPDIR/hooks/post-update"
sudo chmod g+rwx "$WWWDIR"
sudo su - "$USER" -c "mkdir -p \"$USERWWWDIR\""
sudo chown -R "$USER".nodejs "$USERAPPDIR" "$USERWWWDIR"
sudo su - "$USER" -c "cd \"$USERWWWDIR\" && git clone \"$USERAPPDIR\" \"$APPNAME\""
sudo chown -R "$USER".nodejs "$USERWWWDIR/$APPNAME"

exit 0