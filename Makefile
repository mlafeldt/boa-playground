run: bundle.js
	cargo run

bundle.js: code.js
	swc $< -o $@
