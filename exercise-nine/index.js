import * as http from "http";
import * as path from "path";
import { fileURLToPath, URL } from "url";
import { readJSON } from "./utils/fileHelper.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const pathname = `${__dirname}/students.json`;

const parsedStudents = await readJSON(pathname);
console.log(parsedStudents);

const PORT = process.env.PORT || 8080;
const HOSTNAME = "localhost";

const server = http.createServer((req, res) => {

  const myUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathName = myUrl.pathname;

  if (pathName === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end("<h2>Welcome to Grade API</h2>");
  }
  else if (pathName.startsWith("/api/students")) {
    res.writeHead(200, { "Content-Type": "application/json" });
    let result = "";
    result = parsedStudents;

    let subject = myUrl.searchParams.get("subject");
    if (subject) {
      result = parsedStudents.filter((student) => student.subject.toLowerCase() === subject.trim().toLowerCase());
    }

    let id = myUrl.searchParams.get("id");
    if (id) {
      result = parsedStudents.filter((student) => student.id === Number(id.trim()));
    }

    res.end(JSON.stringify(result));
  }
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h2>404 - Not Found</h2>");
  }

});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});