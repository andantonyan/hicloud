install:
	@echo installing backend dependencies...
	@npm install
	@echo installing frontend dependencies...
	@bower install

permissions:
	@echo chmodding...
	@chmod ug+x api/bin/*

deps:
	@sudo npm -g install gulp
	@npm -g install gulp
	@echo installing gulp...
	@sudo npm -g install gulp
	@npm -g install gulp
	@echo installing forever...
	@sudo npm -g install forever
	@npm -g	install forever

migrate:
	@echo making symlinks...
	@cd /var/HiCloudRepos/ && ln -s /var/nodejs/HiCloudWeb/APPS/defaults/
	@echo linking nginx configs...
	@cd /etc/nginx/sites-available
	@ln -s /var/nodejs/HiCloudWeb/APPS/defaults/hicloud.am
	@ln -s /var/nodejs/HiCloudWeb/APPS/defaults/app.hicloud.am
	@echo [done]
