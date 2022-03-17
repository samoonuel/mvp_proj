//References
const submitButton = $("#search");
const username = $(".username");
const email = $(".email");
const password = $(".password");
// const PORT = process.env.PORT;

//Values
const usernameInput = username.value;
const emailInput = email.value;
const passwordInput = password.value;

fetch(`http://localhost:3000/users`)
  .then((res) => res.json())
  .then((data) => console.log(data));
