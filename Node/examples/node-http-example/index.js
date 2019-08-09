const { createServer } = require('http');

const router = {
  "/": (req, res) => {
    res.write("Welcome!");
  },
  "/info": (req, res) => {
    res.write("This is a Node HTTP Server!")
  },
}

const server = createServer((req, res) => {
  console.log(`${req.url} ${req.method}`)
  
  if(router[req.url]) {
    res.writeHead(200, {'Content-Type': 'text/plain', 'David-Header': 'Hello David'});
    router[req.url](req, res)
  } else {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.write(`${req.url} Not Found`);
    res.end();
  }
});

server.listen(4200);