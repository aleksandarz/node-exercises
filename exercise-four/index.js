import * as fs from "fs/promises";
// import * as http from "http";

// const PORT = 8080;
//
// const server = http.createServer(async (req, res) => {
//
//   const pathName = req.url;
//
//   if (pathName === "/") {
//     res.writeHead(200, { "Content-Type": "text/html" });
//     res.end("<h1>Welcome</h1>");
//   } else {
//     res.writeHead(404, { "Content-Type": "text/html" });
//     res.end("<h1>404 - Not Found</h1>");
//   }
// });
//
// server.listen(PORT, () => {
//   console.log(`Server is running on the http://localhost:${PORT}`);
// });

const run = async () => {
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
  parsedUsers.push(user);

  await fs.writeFile("./users.json", JSON.stringify(parsedUsers, null, 2));
  console.log("User added!");
}

run();