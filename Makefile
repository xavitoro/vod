# https://gist.githubusercontent.com/wolfeidau/8748317/raw/172a6adb79777676a8815da5719ef659fb66a35b/Makefile

REPORTER = spec

all: jshint test

test:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive --reporter $(REPORTER) --timeout 3000

jshint:
	jshint lib examples test index.js

tests: test

tap:
	@NODE_ENV=test ./node_modules/.bin/mocha -R tap > results.tap

unit:
	@NODE_ENV=test ./node_modules/.bin/mocha --recursive -R xunit > results.xml --timeout 3000

skel:
	mkdir examples lib test
	touch index.js
	npm install mocha chai --save-dev

.PHONY: test tap unit jshint skel
