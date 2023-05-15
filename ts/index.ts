import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import { PrismaClient } from '@prisma/client'

dotenv.config();

const app = express();
const port = process.env.PORT;
const prisma = new PrismaClient()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Express + TypeScript Server YAY dsfasf');
});

app.get('/persons', async (req, res) => {
  const persons = await prisma.person.findMany();
  console.log("PERSONS: ", persons);
  res.send(JSON.stringify(persons));
});

app.post('/persons', async (req, res) => {
  console.log("BODY: ", req.body);
  const person = await prisma.person.create({
    data: {
      firstName: req.body.first_name,
      lastName: req.body.last_name,
      middleNames: req.body.middle_names,
      externalId: req.body.external_id,
    }
  });
  console.log("PERSON: ", person);
  res.send(JSON.stringify(person));
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

