const http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const s = 1024;
const ring = [];

function a(range) {
	return Math.round(Math.random() * range);
}

function encode(num) {
        let sb = '';
	let c = 0;
        do {
        	c = toAscii(num % 32);
                sb += c;
                num = Math.floor(num / 32);
        } while (num > 0);
        return sb;
}

function toAscii(b) {
	if (b >= 0 && b <= 5)
        	return String.fromCharCode(48 + b);
       	else
                return String.fromCharCode(97 + b - 6);
}

function fromAscii(c) {
	if (c >= 48 && c <= 57)
        	return c - 48;
        else if (c >= 97 && c <= 122)
        	return c - 97 + 6;
        else
        	return -1;
}

function decode(code) {
       	let n = 0;
      	for (let i = 0; i < code.length; i++) {
		c = fromAscii(code.charCodeAt(i));
       		n = Math.round(n * 32 + c);
        }
        return n;
}

function f(url, a, s, ring) {
	let num = a(s);
	console.log('num: ' + num);
	ring[num] = url;
	return encode(num);
}

function g(url, ring) {
	let x = decode(url);
	console.log('decode: ' + x);
	return ring[decode(url)];
}

function action(req, res, a, s, ring) {
	const {method, url} = req;
	console.log('method: ' + method + ' url: ' + url);
	if (method.toLowerCase() === 'put') {
		let data = '';

		req.on('data', (chunk) => {
				data += chunk;
			}
		);

		req.on('end', () => {
				let shrink = f(data, a, s, ring);
				res.end(shrink);
			}
		);	
	} else if (method.toLowerCase() === 'get') {
		res.end(g(url.substr(1), ring));
	}
}

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader = ('Content-Type', 'text/plain');
	action(req, res, a, s, ring);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

