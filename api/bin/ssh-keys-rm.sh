#!/bin/sh

TESTKEY=`sudo su - "$2" -c "grep \"$3\" $1/$2/.ssh/authorized_keys"`

if [ "$TESTKEY" == "" ]; then
    echo -n "KEY_DOESNT_EXIST"
    exit 2
fi

sudo su - "$2" -c "sed -i \"/$3/d\" \"$1/$2/.ssh/authorized_keys\""
exit 0