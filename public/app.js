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

  fetch(`http://localhost:3000/users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response)
      $(".user-create-container").addClass("hide");
      $(".main-container").removeClass("hide");
      $(".main-container").find("*").removeClass("hide");
    })
    .catch((error) => console.log(error.message));
});
