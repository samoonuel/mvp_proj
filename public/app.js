//Imports
import { getUsers } from "/expressServer.js";

//References
const searchButton = document.querySelector("#search");
const username = document.querySelector(".username");
const email = document.querySelector(".email");
const password = document.querySelector(".password");

//Values
const usernameInput = username.value;
const emailInput = email.value;
const passwordInput = password.value;

//Functions
const getUserData = async (url) => {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json;
};

//Submission
searchButton.addEventListener("click", (e) => {
  e.preventDefault();
  getUsers();
  // getUserData("http://localhost:PORT/users").then((data) => console.log(data));
});
