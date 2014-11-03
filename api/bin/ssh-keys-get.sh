#!/bin/sh

CMD=`sudo su - "appuser_$2" -c "cat $1/$2/.ssh/authorized_keys"`

if [ "$@" != "" ]; then
    echo "$@"
    exit 2
fi

echo "$CMD"
exit 0