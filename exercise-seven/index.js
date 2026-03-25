import * as fs from "fs/promises";
import * as http from "http";
import { URL } from "url";

const PORT = process.env.PORT || 8080;

const server = http.createServer(async (req, res) => {

  const myUrl = new URL(req.url,`http://${req.headers.host}`);
  console.log(myUrl);
  const pathname = myUrl.pathname;

  if (pathname === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const todos = await fs.readFile("./todos.json", "utf-8");
    const parsedTodos = JSON.parse(todos);

    let body = "";

    parsedTodos.forEach((todo) => {
      body += `
        <div class="todo">
          <h3>${todo.todoName}</h3>
          <p>${todo.description}</p>
        </div>
      `;
    });

    res.end(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <title>Todos</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: #f4f4f4;
            padding: 20px;
          }
          .todo {
            background: white;
            padding: 15px;
            margin-bottom: 10px;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          h3 {
            margin: 0;
          }
        </style>
      </head>
      <body>
        <h1>My Todos</h1>
        ${body}
      </body>
      </html>
    `);
  }
  else if (pathname === "/add-todo") {
    res.writeHead(200, { "Content-Type": "application/json" });

    const todos = await fs.readFile("./todos.json", "utf-8");
    const parsedTodos = JSON.parse(todos);

    const todo = {
      todoId: "2",
      todoName: "React project",
      description: "Static website for a restaurant"
    }
    parsedTodos.push(todo);

    await fs.writeFile("./todos.json", JSON.stringify(parsedTodos, null, 2),"utf-8");
    res.end("Todo added successfully");
  }
  else if (pathname.startsWith("/delete-todo")) {
    res.writeHead(200, { "Content-Type": "application/json" });

    const todos = await fs.readFile("./todos.json", "utf-8");
    const parsedTodos = JSON.parse(todos);

    let id = myUrl.searchParams.get("id");
    const updatedTodos = parsedTodos.filter((todo) => todo.todoId !== id);

    await fs.writeFile("./todos.json", JSON.stringify(updatedTodos, null, 2));
    res.end("Todo deleted successfully");
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h2>404 - Not Found</h2>");
  }

});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});