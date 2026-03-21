import * as fs from "fs/promises";
import { URL } from "url";
import * as http from "http";

const PORT = 8080;

const server = http.createServer(async (req, res) => {
  const myUrl = new URL(req.url,`http://${req.headers.host}`);
  const pathName = myUrl.pathname;

  const users = await fs.readFile("./users.json", "utf8");
  const parsedUsers = JSON.parse(users);
  parsedUsers.forEach(user => {
    console.log(user.name);
  });

  const user = {
    id: 3,
    name: "Lola",
    role: "user",
  }

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h1>Welcome</h1>");
  }
  else if (pathName === "/add-user") {
    res.writeHead(200, { "Content-Type": "text/html" });
    parsedUsers.push(user);
    await fs.writeFile("./users.json", JSON.stringify(parsedUsers, null, 2));
    res.end("<h1>User added!</h1>");
  }
  else if (pathName === "/delete-user") {
    res.writeHead(200, { "Content-Type": "text/html" });
    const id = myUrl.searchParams.get("id");
    const filteredUsers = parsedUsers.filter(user => user.id !== Number(id));
    await fs.writeFile("./users.json", JSON.stringify(filteredUsers, null, 2));
    res.end("<h1>User removed!</h1>");
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>404 - Not Found</h1>");
  }
});

server.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});

