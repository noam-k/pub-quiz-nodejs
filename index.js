const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/api') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const responseBody = { message: 'Hello World!' };
    res.write(JSON.stringify(responseBody));
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
