BIN := ./node_modules/.bin
SOURCE_FILES := $(shell find src -type f)
TEST_FILES := $(shell find src -type f)
DOC_THEME_FILES := $(shell find doc/theme -type f)
REMOVE := rm --verbose --interactive=never --one-file-system --recursive --force

# The first build target is the one run when someone issues just 'make'.
# Conventionally its name is 'all'. It is .PHONY so make will ignore any files
# that happen to be named 'all'.
# Here we run the tests before building other output.
.PHONY: all
all: node_modules test distfiles doc/build es2015 lib

# node_modules/ holds build dependencies and dependencies to be linked in.
node_modules: package.json
	yarn install --ignore-engines
	@touch node_modules

$(BIN): node_modules

.PHONY: distfiles
distfiles: dist dist/because.min.js dist/because.amd.min.js dist/because.system.min.js

# dist/ holds bundled output for direct use in browsers supporting ES5.
dist: 
	@mkdir -p dist
	@touch dist

# AMD bundle
dist/because.amd.js: Makefile $(BIN) config/tsconfig.json config/tsconfig.amd.json $(SOURCE_FILES)
	$(BIN)/tsc --project config/tsconfig.amd.json --outFile $@

# SystemJS bundle
dist/because.system.js: Makefile $(BIN) config/tsconfig.json config/tsconfig.system.json $(SOURCE_FILES)
	$(BIN)/tsc --project config/tsconfig.system.json --outFile $@

# UMD bundle, can be directly sourced
dist/because.js: Makefile $(BIN) config/webpack.config.js $(SOURCE_FILES)
	$(BIN)/webpack --config config/webpack.config.js

# minify anything in dist/
dist/%.min.js: dist/%.js
	$(BIN)/uglifyjs $< --in-source-map $<.map --compress dead_code,unused,properties,join_vars,collapse_vars,warnings --mangle --output $@ --source-map-include-sources --source-map $@.map 2>/dev/null

# es2015/ holds the library as ES2015 modules containing ES2015 code.
# This could be used directly, bundled for new browsers, or compiled by babel.
es2015: Makefile node_modules config/tsconfig.json config/tsconfig.es2015.json $(SOURCE_FILES)
	$(BIN)/tsc --project config/tsconfig.es2015.json
	@touch es2015

# lib/ holds the library as ES5 in CommonJS modules for all versions of Node,
# and via Browserify for direct use in most browsers.
# Files in lib/ are referenced by package.json "main" and "browser".
# "main" references the entry point file used to resolve require("because").
# "browser" references a similar but browser-specific entry point,
# see https://github.com/defunctzombie/package-browser-field-spec
lib: Makefile $(BIN) config/tsconfig.json config/tsconfig.cjs.json $(SOURCE_FILES)
	$(BIN)/tsc --project config/tsconfig.cjs.json
	@touch lib

lib/test: Makefile $(BIN) config/tsconfig.json config/tsconfig.test.json $(TEST_FILES)
	$(BIN)/tsc --project config/tsconfig.test.json
	@touch lib/test

# doc/build/ holds generated output of doc generators.
# NOTE: typedoc.json has to be in the root or it will barf --help output... :/
doc/build: Makefile $(BIN) config/typedoc.json doc doc/index.md doc/theme $(DOC_THEME_FILES) node_modules
	$(BIN)/typedoc --tsconfig config/typedoc.json --name because.js --readme doc/index.md --theme default --hideGenerator --out doc/build
	@touch doc/build

# coverage/ holds coverage report output.
# This is a bit slower and not needed quite as often as 'make test'.
coverage: $(BIN) lib lib/test
	$(BIN)/nyc $(BIN)/mocha lib/test/**/*.js

# The following build targets are marked .PHONY to tell make not to check the
# existence or timestamp of the file with the name of the build target.
# For example, 'make test' ignores any file named 'test' and just runs the
# rule.

.PHONY: watch
watch:
	webpack --watch --config config/webpack.config.js

.PHONY: clean
clean:
	${REMOVE} node_modules es2015 lib dist .nyc_output
	${REMOVE} example/node_modules
	mkdir --verbose dist lib es2015

.PHONY: lint
lint: 
	$(BIN)/tslint --project config/tsconfig.cjs.json --config config/tslint.typechecked.json --type-check

.PHONY: test
test: node_modules lib
	$(BIN)/ts-mocha --project config/tsconfig.test.json test/*
