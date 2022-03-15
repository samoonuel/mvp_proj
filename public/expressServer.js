import express from "express";
import pg from "pg";

const app = express();
const PORT = 3000;
const { Pool } = pg;
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  database: "mvp_db",
  user: "samoonuel",
  password: "gR3@tPaS$w0Rd",
});

const getUsers = (request, response) => {
  console.info(request.body);
  pool
    .query("SELECT * FROM users;")
    .then((result) => response.send(result.rows))
    .catch((error) => response.sendStatus(500));
};

const createUser = (request, response) => {
  const { username, email, password } = request.body;
  if (!username || !email || !password) {
    console.info(username, email, password);
    response
      .status(400)
      .send("You're missing a required field. Please try again.");
  } else {
    pool
      .query(
        "INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')));",
        [username, email, password]
      )
      .then((body) => {
        response.status(200).send("Account created successfully.");
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
};

app.get("/users", getUsers);
app.post("/users", createUser);

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`));
