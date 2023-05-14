import dotenv from "dotenv";
import express from "express";
import path from "path";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server YAY dsfasf');
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

