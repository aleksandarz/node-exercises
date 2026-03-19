import * as fs from "fs";

const noteText = "Hello from Node.js!";

fs.writeFile("./txt/notes.txt", noteText, "utf-8", err => {
  if (err) return console.log("Error while writing in the file:  " + err);
  console.log("Note written successfully!");
});

fs.readFile("./txt/notes.txt", "utf8", (err, data) => {
  if (err) return console.log("Error while reading the file: " + err);
  console.log("Note: " + data);
  const newNoteText = "This is a second line.";
  fs.writeFile("./txt/notes.txt", `${data}\n${newNoteText}`, "utf-8", err => {
    if (err) return console.log("Error while writing in the file:  " + err);
    console.log("New note written successfully!");
  });
});



