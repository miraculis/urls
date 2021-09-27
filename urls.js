function a(range) {
	return Math.round(Math.random() * range);
}

function encode(num) {
        let sb = '';
	let c = 0;
        do {
        	c = toAscii(num % 32);
		sb = c + sb;
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
      	for (let i = code.length - 1; i > -1; i--) {
		c = fromAscii(code.charCodeAt(i));
       		n = n + Math.pow(32, code.length - i - 1) * c;
        }
        return n;
}

function f(url, s, ring) {
	let num = a(s);
	ring[num] = url;
	return encode(num);
}

function g(url, ring) {
	let x = decode(url);
	return ring[decode(url)];
}

module.exports.a = a;
module.exports.toAscii = toAscii;
module.exports.fromAscii = fromAscii;
module.exports.decode = decode;
module.exports.encode = encode;
module.exports.f = f;
module.exports.g = g;