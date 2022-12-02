run: bundle
	cargo run

bundle:
	swc lib.js main.js -o bundle.js
