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

createButton.on("click", createUser);

const removeEmail = () => {
  $(email).remove();
  $(".email-label").remove();
  $(createButton).remove();
}


//User Login
const loginButton = $('<button class="login-button" type="button">Log In</button>');
const form = $('#user-creator');

existingUser.on("click", () => {
  // var txt2 = $("<p></p>").text("Text.");
  removeEmail();
  form.append(loginButton);
})

const login = () => {
  const loginData = { username: username.val(), password: password.val() }
  fetch('http://localhost:3000/login/', {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(loginData),
  })
    .then(response => response.json())
    .then(user => {
      if (
        user.username === username.val() && user.password === password.val()
      ) {
        $(".user-create-container").addClass("hide");
        $(".main-container").removeClass("hide");
      }
    })
    .catch(error => {
      if (
        error.message === "JSON.parse: unexpected end of data at line 1 column 1 of the JSON data"
      ) {
        alert("Incorrect username or password")
      }
    });
}

loginButton.on("click", login);

/* This is the main page functionality going forward
 *  !!! Set up the ability to post and save it to the user_id
 *  !!! The posts need to be saved into the database w/ user_id
 *  ! If there are no posts for the available feed there should be a default prompt  
 *  ! Side profile needs to have username and default photo
 */

//References
const profileUsername = $(".profile-username");
const postContent = $(".post-content");
const postButton = $(".create-post");

const createPost = () => {
  const url = "http://localhost:3000/user"
  const userData = { username: username.val() }
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(userData),
  })
    .then(response => response.json())
    .then(user => {
      const userID = user.user_id;
      console.log(userID);
      const postData = { postContent: postContent.val(), user_id: userID }
      return fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(postData),
      })
      .then(response => response.json())
      .then(() => {
        const post = $(`<p>${postContent.val()}</p>`)
        const feed = $(".content-container");
        feed.append(post);
      }
      )
    })
    .catch(error => console.error(error.message))
}

postButton.on("click", createPost)
