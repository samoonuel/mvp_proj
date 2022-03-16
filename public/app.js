//References
const searchButton = document.querySelector("#search");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

//Values
const usernameInput = username.value;
const emailInput = email.value;
const passwordInput = password.value;

const userData = {
  username: usernameInput,
  email: emailInput,
  password: passwordInput,
};

//Functions

//Submission
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
});
