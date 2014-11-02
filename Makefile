install:
	@echo installing backend dependencies...
	@npm install
	@echo installing frontend dependencies...
	@bower install

deps:
	@sudo npm -g install gulp
	@npm -g install gulp
	@echo installing gulp...
	@sudo npm -g install gulp
	@npm -g install gulp
	@echo installing forever...
	@sudo npm -g install forever
	@npm -g	install forever
