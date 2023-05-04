const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/api') {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const userId = data.userId;
        const qaPairs = data.qaPairs;
        console.log(`Received data from user ${userId}:`, qaPairs);
        // Add data processing
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const responseBody = { message: 'Data received and processed successfully!' };
        res.write(JSON.stringify(responseBody));
        res.end();
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Bad Request');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
