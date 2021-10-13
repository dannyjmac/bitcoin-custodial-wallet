import express from "express";
import expressWs from "express-ws";
import cors from "cors";
import ln from "./Lightning";
import { router } from "./routes";

require("dotenv").config();

const PORT: number = 4000;

const { app } = expressWs(express());
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  req.body.token = req.header("X-Token");
  next();
});

app.use(router);

console.log("Starting API server...");
app.listen(PORT, async () => {
  console.log(`API listening at http://localhost:${PORT}`);
  await ln.reconnectNode();
});
