# make all

.PHONY: css
css:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/index.css --output bundle/index.min.css

.PHONY: css2
css2:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/content.css --output bundle/content.min.css

.PHONY: js
js:
	mkdir -p bundle
	babel --watch js/index.js --out-file bundle/index.min.js

.PHONY: js2
js2:
	mkdir -p bundle
	babel --watch js/nav_footer.js --out-file bundle/nav_footer.min.js

.PHONY: server
server:
	browser-sync start --server --files='index.html, spr.html, bundle, css, js, img'

.PHONY: clean
clean:
	rm -r bundle

.PHONY: all
all:
	make css & make js & make css2 & make js2 & make server & wait

# make mobile

.PHONY: css3
css3:
	mkdir -p bundle
	postcss --watch --use autoprefixer --use postcss-import css/mobile.css --output bundle/mobile.min.css

.PHONY: js3
js3:
	mkdir -p bundle
	babel --watch js/mobile.js --out-file bundle/mobile.min.js

.PHONY: server3
server3:
	browser-sync start --server --files='mobile.html, bundle, css, js, img'

.PHONY: mobile
mobile:
	make css3 & make js3 & make js3 & make server3 & wait
