#!/bin/sh

USERDIR="$1/$2"
APPDIR="$USERDIR/$3.git"
USER="$2"

sudo su - "$USER" -c "mkdir \"$APPDIR\""
sudo su - "$USER" -c "cd $APPDIR && git --bare init"
sudo su - "$USER" -c "sed -i /__DEPLOY_DIR__/$4/ $1/defaults/post-update.sample"
sudo su - "$USER" -c "cp $1/defaults/post-update.sample $APPDIR/hooks/post-update"
sudo chown -R "$USER".nodejs "$APPDIR"
mkdir -p "$4/$2" && cd "$4/$2" && git clone "$APPDIR" "$3"

exit 0