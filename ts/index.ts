import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import * as persons from "./controllers/persons";

dotenv.config();

const app = express();
const port = process.env.PORT;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.type("json");
  next();
});

app.get("/persons", persons.getAll);

app.post("/persons", persons.create);

app.get("/persons/:id", persons.getById);

app.put("/persons/:id", persons.updateById);

app.delete("/persons/:id", persons.deleteById);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
