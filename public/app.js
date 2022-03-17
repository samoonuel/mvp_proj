//References
const submitButton = $("#search");
const username = $(".username");
const email = $(".email");
const password = $(".password");

//Create User
$(submitButton).on("click", () => {
  const data = {
    username: username.val(),
    email: email.val(),
    password: password.val(),
  };

  console.log(username.val());

  const settings = {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  };

  console.log(settings.body);

  fetch(`http://localhost:3000/users/`, settings)
    .then((response) => console.log(response))
    .catch((error) => console.log(error.message));
});
