#!/bin/bash

APPDIR="$1"
USER="$2"
APPNAME="$3"
WWWDIR="$4"
BINDIR="$5"

USERDIR="$APPDIR/$USER"
USERAPPDIR="$USERDIR/$APPNAME.git"
USERWWWDIR="$WWWDIR/$USER"
USERHOOK="$USERAPPDIR/hooks/post-update"
USERNGINXCONF="/etc/nginx/sites-available/$APPNAME.hicloud.am"
USERNGINXCONF_EN="/etc/nginx/sites-enabled/$APPNAME.hicloud.am"
PORT=$((`id -u $USER` + 1000))

sudo su - "$USER" -c "mkdir \"$USERAPPDIR\""
sudo su - "$USER" -c "cd $USERAPPDIR && git --bare init"
sudo su - "$USER" -c "cp $APPDIR/defaults/post-update.sample $USERHOOK"
sudo sed -i s#__DEPLOY_DIR__#$WWWDIR#g $USERHOOK
sudo sed -i s#__API_DIR__#$BINDIR#g $USERHOOK
sudo cp "$APPDIR/defaults/nginx_vhost" $USERNGINXCONF
sudo sed -i s#__APPNAME__#$APPNAME#g $USERNGINXCONF
sudo sed -i s#__PORT__#$PORT#g $USERNGINXCONF
sudo ln -s $USERNGINXCONF $USERNGINXCONF_EN
sudo /etc/init.d/nginx restart
sudo chmod g+rwx "$WWWDIR"
sudo su - "$USER" -c "mkdir -p \"$USERWWWDIR\""
sudo chown -R "$USER".nodejs "$USERAPPDIR" "$USERWWWDIR"
sudo su - "$USER" -c "cd \"$USERWWWDIR\" && git clone \"$USERAPPDIR\" \"$APPNAME\""
sudo chown -R "$USER".nodejs "$USERWWWDIR/$APPNAME"
sudo chown -R "$USER".nodejs "$USERWWWDIR/$APPNAME/.git"

exit 0