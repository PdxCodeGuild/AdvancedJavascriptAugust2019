const http = require("http");
const fs = require("fs");
const path = require('path');
const mime = require("mime-types");

// Function that returns a function
const staticFiles = (staticDirectory) => (req, res) => {
  try {
    const files = fs.readdirSync(staticDirectory);
    const filePath = req.url.slice(1);

    if(files.includes(filePath)) {
      const fullPath = path.join(staticDirectory, filePath);
      const data = fs.readFileSync(fullPath);
      const mimeType = mime.lookup(fullPath);

      res.writeHead(200, {'Content-Type': mimeType});
      res.write(data);
    } else {
      res.writeHead(404, {'Content-Type': 'text/plain'})
      res.write(`${req.url} Not Found`);
    }

  } catch(err) {
    res.writeHead(500, {'Content-Type': 'text/plain'})
    res.write(`${req.url} Failed To Serve`);
  } finally {
    res.end()
  }

}

const server = http.createServer((req, res) => {
  const static = staticFiles("./static");

  static(req, res);
});

server.listen(3000, "localhost", 1000, () => {
  console.log("Listening at localhost:3000...");
})