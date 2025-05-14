const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }

  // Set CSP headers based on the requested file
  if (filePath.includes('scenario-1')) {
    res.setHeader('Content-Security-Policy', "script-src 'self' https: 'unsafe-inline' 'unsafe-eval';");
  } else if (filePath.includes('scenario-2')) {
    res.setHeader('Content-Security-Policy', "default-src 'self';");
  } else if (filePath.includes('scenario-3')) {
    res.setHeader('Content-Security-Policy', "style-src 'self';");
  } else if (filePath.includes('scenario-4')) {
    res.setHeader('Content-Security-Policy', "style-src https://cdn.jsdelivr.net;");
  } else if (filePath.includes('scenario-5')) {
    res.setHeader('Content-Security-Policy', "style-src https://cdn.jsdelivr.net;");
  } else if (filePath.includes('scenario-6')) {
    res.setHeader('Content-Security-Policy', "style-src 'unsafe-inline';");
  } else if (filePath.includes('scenario-7')) {
    res.setHeader('Content-Security-Policy', "style-src https:;");
  } else if (filePath.includes('scenario-8')) {
    res.setHeader('Content-Security-Policy', "default-src 'self'; style-src https://cdn.jsdelivr.net;");
  }
  // No CSP header for scenario-0 and other files

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript',
    '.md': 'text/plain'
  }[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>404 Not Found</h1><p>The requested file does not exist.</p>', 'utf-8');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${error.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`CSP Validation Test Server running at http://localhost:${port}/`);
  console.log('Open this URL in your browser to begin testing.');
});
