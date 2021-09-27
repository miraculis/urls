const assert = require('assert');
const urls = require('../urls');

describe('Encoding Test', () => {
 it('should be equal', () => {
	for(let num = 0; num < 1024; num++) {
		let code = urls.encode(num);
		let num1 = urls.decode(code);
        	assert.equal(num1, num);
	}
    });
});

describe('f-g test', () => {
 it('should be equal', () => {
	let s = 1024;
	let ring = [];

	for (let i = 1024; i < 2048; i++) {
		let url = i.toString(16);
		let url1 = urls.g(urls.f(url, s, ring), ring);
		assert.equal(url1, url);
	}
 });
});