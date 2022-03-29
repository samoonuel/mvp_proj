//References
const createButton = $(".create");
const loginButton = $(".login");
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

$(createButton).on("click", () => {
  createUser();
});

const login = () => {
  const data = {
    username: username.val(),
    password: password.val(),
  }

  fetch('http://localhost:3000/users/', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
  }).then((response) => {
    console.log(response);
  })
}

$(loginButton).on("click", () => {
  // var txt2 = $("<p></p>").text("Text.");
  const loginButton = $("<button></button>").text("Login")
  console.log(loginButton, $("#user-creator"))
  $(email).remove();
  $(".email-label").remove();
  $(createButton).remove();
  $("#user-creater").append(loginButton);
})