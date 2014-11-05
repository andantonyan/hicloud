#!/bin/sh

USERDIR="$1/$2"
APPDIR="$USERDIR/$3.git"
USER="$2"

sudo mkdir "$APPDIR"
sudo su - "$USER" -c "cd $APPDIR && git --bare init"
sudo su - "$USER" -c "cp $1/defaults/post-update.sample $APPDIR/hooks/post-update"
sudo chown -R "$USER".nodejs "$APPDIR"

exit 0