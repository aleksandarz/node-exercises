import * as fs from "fs";
import * as http from "http";

let PORT = process.env.PORT || 8080;
let HOSTNAME = process.env.HOSTNAME || "localhost";

const server = http.createServer();

server.on("request", (req, res) => {
  const readStream = fs.createReadStream("./input.txt");

  let chunkCount = 0;

  readStream.on("data", (chunk) => {
    chunkCount++;
    console.log(`📦 Chunk received: ${chunkCount}`);
    res.write(chunk);
  });

  readStream.on("end", () => {
    console.log(`✅ Done reading file! Total chunks: ${chunkCount}`);
    res.end();
  });
});

server.listen(PORT, HOSTNAME, () => {
  console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
