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
