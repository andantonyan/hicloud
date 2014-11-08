#!/bin/sh

APPDIR="$1"
USER="$2"
APPNAME="$3"
WWWDIR="$4"

USERDIR="$APPDIR/$USER"
USERAPPDIR="$USERDIR/$APPNAME.git"
USERWWWDIR="$WWWDIR/$USER"

sudo su - "$USER" -c "rm -rf \"$USERAPPDIR\" \"$USERWWWDIR/$APPNAME\""

exit 0