import * as http from "http";
import * as fs from "fs/promises";
import { URL } from "url";

const PORT = process.env.PORT || 8080;

const recipes = await fs.readFile("./recipes.json", "utf-8");
const parsedRecipes = JSON.parse(recipes);

const server = http.createServer(async (req, res) => {

  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  console.log(myUrl);
  const pathname = myUrl.pathname;

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome to the Recipe API!</h1>");
  }
  else if (pathname.startsWith("/api/recipes")) {
    res.writeHead(200, { "Content-Type": "application/json" });

    let result = "";
    result = parsedRecipes;

    let cuisine = myUrl.searchParams.get("cuisine");
    if (cuisine) {
      result = parsedRecipes.filter((recipe) => recipe.cuisine.trim().toLowerCase() === cuisine.trim().toLowerCase());
    }

    let id = myUrl.searchParams.get("id");
    if (id) {
      result = parsedRecipes.filter((recipe) => recipe.id === Number(id.trim()));
    }

    res.end(JSON.stringify(result, null, 2));
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }

});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});