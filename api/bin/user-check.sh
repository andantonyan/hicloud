#!/bin/sh

USERDIR="$1/$2"
USER="$2"

TESTUSER=false
sudo getent passwd "$USER" >/dev/null 2>&1 && TESTUSER=true

if [ "$TESTUSER" = true ]; then
    echo -n "SYS_USER_EXISTS"
    exit 1
fi

exit 0