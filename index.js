const http = require('http');
const fs = require('fs');
const { parse } = require('csv-parse/sync');
const { stringify } = require('csv-stringify/sync');
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
        // Write the data to a CSV file
        const csvFilePath = './data.csv';
        let fileData;
        if (fs.existsSync(csvFilePath)) {
          fileData = fs.readFileSync(csvFilePath, 'utf-8');
        } else {
          fileData = stringify([['User ID', 'Question', 'Answer']]);
        }
        const records = parse(fileData, { columns: true });
        qaPairs.forEach(qaPair => {
          const record = { 'User ID': userId, 'Question': qaPair.question, 'Answer': qaPair.answer };
          records.push(record);
        });
        const newFileData = stringify(records, { header: true });
        fs.writeFileSync(csvFilePath, newFileData);
        // Send a response
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const responseBody = { message: 'Data received and processed successfully!' };
        res.write(JSON.stringify(responseBody));
        res.end();
      } catch (error) {
        console.log(error);
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
