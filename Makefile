run: bundle
	cargo run

bundle:
	swc lib.ts main.ts -o bundle.js
