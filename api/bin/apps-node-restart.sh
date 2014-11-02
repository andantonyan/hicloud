#!/bin/sh

APPDIR="$1"
APPFILE=`cat $APPDIR/Procfile`
OWNER=`stat -c '%U' "$APPDIR"`

sudo su - $OWNER -c "forever stop $APPDIR/$APPFILE"
sudo su - $OWNER -c "forever start $APPDIR/$APPFILE"