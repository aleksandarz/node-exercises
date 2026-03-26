import * as fs from "fs/promises";

export const readJSON = async (filename) => {
  const students = await fs.readFile(filename, "utf8");
  return JSON.parse(students);
}