#!/bin/sh

sudo su - "appuser_$2" -c "cat $1/$2/.ssh/authorized_keys"