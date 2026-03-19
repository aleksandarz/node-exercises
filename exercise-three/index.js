import * as http from "http";
import * as fs from "fs/promises";

const PORT = 8080;

const readProducts = async () => {
  const data = await fs.readFile("./products.json", "utf-8");
  return JSON.parse(data);
}

const getProductWithID = async (id) => {
  const products = await readProducts();
  return products.find((product) => product.id === id);
}

const server = http.createServer(async (req, res) => {

  const pathName = req.url;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("Welcome to the fruit shop!");
  }
  else if (pathName === "/products") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const products = await readProducts();
    res.end(JSON.stringify(products));
  }
  else if (pathName.startsWith("/products/")) {
    const id = Number(pathName.split("/")[2]);
    const product = await getProductWithID(id);

    if (!product) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Product not found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(product));
    }
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }

});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});