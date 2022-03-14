import express from "express";
import { Pool } from "pg";

const app = express();
const PORT = 3000;


app.listen(PORT, (res) => res.send(`Listening on port: ${PORT}`));