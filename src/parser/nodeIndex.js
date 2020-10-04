const http = require('http');
const parse = require('./parser').parse;

http.createServer((req, res) => {

    res.writeHead(200, {
        'Content-Type': 'text/html',
    });

    res.write('<html><head><meta charset="UTF-8"/></head><body>');

    var input = 'HOA: v1 \
    States: 3\
    Start: 0\
    acc-name: Rabin 1\
    Acceptance: 2 (Fin(0) & Inf(1))\
    AP: 2 "a" "b"\
    properties: prop1\
    properties: prop2\
    --BODY--\
    State: 0 "a U b"   /* An example of named state */\
    [0 & !1] 0 {0}\
    [1] 1 {0}\
    State: 1\
    [t] 1 {1}\
    --END--';
    data = parse(input);
    res.write(data.toHoaString());
    res.write(JSON.stringify(data));
    res.write('</body></html>');
    res.end();

}).listen(3000, '127.0.0.1');

