const http = require('http');
const urls = require('./urls');

const hostname = '127.0.0.1';
const port = 8080;

const s = 1024;
const ring = [];

function action(req, res, s, ring) {
	const {method, url} = req;
	console.log('method: ' + method + ' url: ' + url);
	if (method.toLowerCase() === 'put') {
		let data = '';

		req.on('data', (chunk) => {
				data += chunk;
			}
		);

		req.on('end', () => {
				res.end(urls.f(data, s, ring));
			}
		);	
	} else if (method.toLowerCase() === 'get') {
		res.end(urls.g(url.substr(1), ring));
	}
}

const server = http.createServer((req, res) => {
	res.statusCode = 200;
	res.setHeader = ('Content-Type', 'text/plain');
	action(req, res, s, ring);
});

server.listen(port, hostname, () => {
	console.log(`Server running at http://${hostname}:${port}/`);
});

