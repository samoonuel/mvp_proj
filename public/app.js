//References
const createButton = $(".create");
const existingUser = $(".login");
const username = $(".username-input");
const email = $(".email-input");
const password = $(".password-input");

//User Functionality

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

//Post Functionality

//References
const profileUsername = $(".profile-username");
const postContent = $(".post-content");
const postButton = $(".create-post");
const feed = $(".content-container");

//Get posts for feed
const getPosts = () => {
  const url = "http://localhost:3000/users/";
  const userData = { username: username.val() }
  fetch(url)
    .then(response => response.json())
    .then(result => {
      for (user of result) {
            
      }
      // return fetch("http://localhost:3000/posts/")
      //   .then(response => response.json())
      //   .then(posts => {
      //     for (post of posts) {
      //       console.log("user user_id:", user_id, "\npost user_id", post.user_id);
      //       // if(user_id === post.user_id) {
      //       //   console.log(username, post.post_content);
      //       // }
      //       // const existingPost = $(`<p class="post"><strong>${username}</strong> ${post.post_content}</p>`)
      //       // feed.append(existingPost);
      //     }
      //   })
      //   .catch(error => console.error(error.message));
    })
    .catch(error => console.error(error.message));
}

//Create a post
const createPost = () => {
  const url = "http://localhost:3000/user/"
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
      return fetch("http://localhost:3000/posts/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify(postData),
      })
        .then(response => response.json())
        .then(() => {
          const post = $(`<p class="post"><strong>${user.username}</strong> ${postContent.val()}</p>`)
          feed.append(post);
        })
    })
    .catch(error => console.error(error.message))
}

postButton.on("click", createPost);
loginButton.on("click", getPosts);