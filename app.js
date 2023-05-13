const express = require('express');
const fs = require('fs');
const { stringify } = require('csv-stringify/sync');
const { parse } = require('csv-parse/sync');

const app = express();

app.listen(3000);

app.get('/try', (req, res) => {
    res.send('<p> Hello World1 </p>')
})

app.get('/delete_data', (req, res) => {
    try {
        const csvFilePath = './data.csv'
        if (fs.existsSync(csvFilePath)) {
          fs.unlinkSync(csvFilePath);
          console.log('csv data deleted');
        }
        const responseBody = { message: 'data deleted' };
        res.send(JSON.stringify(responseBody));
      } catch (error) {
        console.log(error);
        res.send('Server Error while deleting data');
      }
})

app.post('/api', (req, res) => {
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

        const responseBody = { message: 'Data received and processed successfully' };
        res.send(JSON.stringify(responseBody));
        } catch (error) {
        console.log(error);
        res.send('Bad Request');
        }
    });
})