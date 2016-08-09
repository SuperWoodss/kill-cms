# make all

.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/kill-cms.css --output bundle/kill-cms.min.css

.PHONY: js
js:
	mkdir -p bundle
	babel --watch js/kill-cms.js --out-file bundle/kill-cms.min.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, bundle, css, js, img'

.PHONY: clean
clean:
	rm -r bundle

.PHONY: all
all:
	make css & make js & make server & wait
