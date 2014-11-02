#!/bin/sh

TESTKEY=`sudo su - "appuser_$2" -c "grep \"$3\" $1/$2/.ssh/authorized_keys"`

if [ "$TESTKEY" != "" ]; then
    echo -n "KEY_EXISTS"
    exit 2
fi

sudo su - "appuser_$2" -c "echo \"$3\" >> $1/$2/.ssh/authorized_keys"

exit 0