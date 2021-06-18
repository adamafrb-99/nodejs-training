const fs = require('fs');
const http = require('http');


const server = http.createServer((req, res) => {
    if (req.method !== 'GET') {
        res.end(`{"error": "Oops... ${http.STATUS_CODES[405]}"}`);
    } else {
        fs.readFile('db.json', (err, data) => {
            if (err) {
                return console.log(err.message);
            }

            if (req.url !== '/foods') {
                res.end(`{"error": "Oops.. ${http.STATUS_CODES[404]}"}`);
            } else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(data);
            }

        })
    }
});

server.listen(8000, () => {
    console.log("Server listening on port 8000");
});

console.log(__dirname)