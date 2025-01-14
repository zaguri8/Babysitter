import express from "express";
import dotenv from "dotenv";
import db from "./database";
dotenv.config();
const app = express();

app.listen(8080, async function onInit() {
  console.log("Listening on port 8080, connecting to db..");
  await db;
  console.log("Connected to mongo db");
});
