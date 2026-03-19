import * as http from "http";

const PORT = 8080;

const server = http.createServer((req, res) => {
  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome!</h1>");
  } else if (pathName === "/about") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>About page</h1>");
  } else if (pathName === "/contact") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({
      "email": "contact@example.com",
      "phone": "123-456-789"
    }));
  } else {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
})