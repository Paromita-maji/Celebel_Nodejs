/*const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
    fs.readFile('test.txt', (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('Welcome to File Management Tool, This tool allows you to perform basic file operations such as creating, reading, and deleting files using Node.js core modules.');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            res.end();
        }
    });
}).listen(3000);

//creating files

fs.appendFile('mynewfile1.txt', 'Hello content!', (err) => {
    if (err) throw err;
    console.log('File saved!');
});

//deleting files

const filePath = 'mynewfile1.txt'; // Specify the file path
fs.unlink(filePath, (error) => {
    if (error) {
        console.error('Error deleting file:', error);
    } else {
        console.log('File deleted successfully!');
    }
});*/

                            //ASSIGNMENT - 3//
                            
//Convert callback-based code to Promises and Async/Await.

const http = require('http');
const fs = require('fs').promises; // Use the promises version of fs

const server = http.createServer(async (req, res) => {
    try {
        const data = await fs.readFile('test.txt', 'utf-8');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        res.end();
    } catch (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Welcome to File Management Tool, This tool allows you to perform basic file operations such as creating, reading, and deleting files using Node.js core modules.');
    }
});

server.listen(3000);

// Creating files
(async () => {
    try {
        await fs.appendFile('mynewfile1.txt', 'Hello content!');
        console.log('File saved!');
    } catch (err) {
        console.error('Error creating file:', err);
    }
})();

// Deleting files
(async () => {
    const filePath = 'mynewfile1.txt';
    try {
        await fs.unlink(filePath);
        console.log('File deleted successfully!');
    } catch (err) {
        console.error('Error deleting file:', err);
    }
})();


