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

const getPosts = (request, response) => {
  pool
    .query("SELECT * FROM posts;")
    .then(result => response.json(result.rows))
    .catch(error => response.status(500).send(error.message));
}

const createPost = (request, response) => {
  const { postContent, user_id } = request.body;
  const query = "INSERT INTO posts (user_id, post_content) VALUES ($1, $2)";
  pool
    .query(query, [user_id, postContent])
    .then(result => response.json(result))
    .catch(error => response.status(500).send(error.message));
}

const login = (request, response) => {
  const { username, password } = request.body;
  const query = "SELECT * FROM users WHERE username = $1 AND password = $2;";
  pool
    .query(query, [username, password])
    .then(result => response.json(result.rows[0]))
    .catch(error => response.status(500).send(error.message));
}

const getUsername = (request, response) => {
  const { user_id } = request.body;
  pool
    .query("SELECT * FROM users WHERE user_id = $1;", [user_id])
    .then(result => response.json(result))
    .catch(error => response.status(500).send(error.message));
}

const getUser = (request, response) => {
  const { username } = request.body;
  const query = "SELECT * FROM users WHERE username = $1;"
  pool
    .query(query, [username])
    .then(result => response.json(result.rows[0]))
    .catch(error => response.status(500).send(error.message));
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

app.get("/posts(/?)", getPosts);
app.post("/username(/?)", getUsername);
app.post("/user(/?)", getUser);
app.post("/login(/?)", login);
app.post("/users(/?)", createUser);
app.post("/posts(/?)", createPost);
app.delete("/users/:index", deleteUser);

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`));
