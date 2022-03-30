import express from "express";
import pg from "pg";
import "dotenv/config";
import cors from "cors";

const app = express();
const PORT = process.env.PORT;
const { Pool } = pg;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(
  cors({
    origin: "*",
  })
);

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const login = (request, response) => {
  console.log(request.body);
  const { username, password } = request.body;
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2;";
  pool
    .query(query, [ username, password ])
    .then(result => response.json(result.rows[0]))
    .catch(error => response.status(500).send(error.message));
}

const getUsers = (request, response) => {
  const { username, password } = request.body;
  const query = "SELECT * FROM users "
  if (username && password) {
    pool
      .query(query, [password, username])
      .then((result) => {
        const pswmatch = result.rows[0].pswmatch;
        if (pswmatch !== true || pswmatch === undefined) {
          response.status(400).send("Username or password is incorrect")
        } else {
          response.send(result);
        }
      })
      .catch((error) => response.status(500).send(error.message));
  }
};

const createUser = (request, response) => {
  const { username, email, password } = request.body;
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, $3);";
  const values = [username, email, password];

  if (!username || !email || !password) {
    response
      .status(400)
      .send("You're missing a required field. Please try again.");
  } else {
    pool
      .query(query, values)
      .then((result) =>
        response.status(200).send("Account created successfully.")
      )
      .catch((error) => {
        if (
          error.message ===
          'duplicate key value violates unique constraint "users_username_key"'
        )
          response.status(400).send("That username is not available.");
        else if (
          error.message ===
          'duplicate key value violates unique constraint "users_email_key"'
        )
          response.status(400).send("That email is not available.");
        else response.status(500).send(error.message);
      });
  }
};

const deleteUser = (request, response) => {
  const { index } = request.params;
  pool
    .query("DELETE FROM users WHERE user_id = $1", [index])
    .then((result) => {
      if (result.rowCount === 0)
        response
          .status(400)
          .send("User has already been deleted or does not exist");
      else response.status(200).send("User deleted.");
    })
    .catch((error) => response.status(500).send(error.message));
};

app.get("/users(/?)", getUsers);
app.post("/login(/?)", login);
app.post("/users(/?)", createUser);
app.delete("/users/:index", deleteUser);

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`));
