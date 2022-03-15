import express from "express";
import pg from "pg";

const app = express();
const PORT = 3000;
const { Pool } = pg;
app.use(express.urlencoded({ extended: true }));

const pool = new Pool({
  database: "mvp_db",
  user: "samoonuel",
  password: "",
});

const get = (path, callback) => app.get(path, callback);
const post = (path, callback) => app.post(path, callback);

// WIP;
const existingUser = (user, username) => {
  if (!user) return;
  pool.query(
    "SELECT EXISTS (SELECT 1 FROM users WHERE username = $1)",
    [user],
    () => {
      //   if()
    }
  );
};

const getUsers = (request, response) => {
  pool
    .query("SELECT * FROM users;")
    .then((result) => response.send(result.rows))
    .catch((error) => response.sendStatus(500));
};

const createUser = (request, response) => {
  const { username, email, password } = request.body;
  const query =
    "INSERT INTO users (username, email, password) VALUES ($1, $2, crypt($3, gen_salt('bf')));";
  const values = [username, email, password];
  if (!username || !email || !password) {
    response
      .status(400)
      .send("You're missing a required field. Please try again.");
  } else {
    pool
      .query(query, values)
      .then((result) => {
        response.status(200).send("Account created successfully.");
      })
      .catch((error) => {
        response.status(500).send(error.message);
      });
  }
};

get("/users", getUsers);
post("/users", createUser);

export { get, post };

app.listen(PORT, () => console.info(`Server running on port: ${PORT}`));
