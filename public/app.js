//References
const createButton = $(".create");
const existingUser = $(".login");
const username = $(".username-input");
const email = $(".email-input");
const password = $(".password-input");

//Create User
const createUser = () => {
  const data = {
    username: username.val(),
    email: email.val(),
    password: password.val(),
  };

  fetch(`http://localhost:3000/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.status === 400) {
        alert("You're missing a required field. Please try again.")
        return;
      } else {
        $(".user-create-container").addClass("hide");
        $(".main-container").removeClass("hide");
      }
    })
    .catch((error) => console.log(error.message));
}

$(createButton).on("click", createUser);

const removeEmail = () => {
  $(email).remove();
  $(".email-label").remove();
  $(createButton).remove();
}

const loginButton = $('<button class="login-button" type="button">Log In</button>');
const form = $('#user-creator');

$(existingUser).on("click", () => {
  // var txt2 = $("<p></p>").text("Text.");
  removeEmail();
  form.append(loginButton);
})

const login = () => {
  console.log("login here!", username.val(), password.val());
  const loginData = { username: username.val(), password: password.val() }
  fetch('http://localhost:3000/login/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(loginData),
  })
  .then(response => response.json())
  .then(user => console.log(user));
}

$(loginButton).on("click", login);