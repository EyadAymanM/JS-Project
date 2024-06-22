let login = document.querySelector("#login-form");
let signup = document.querySelector("#signup-form");
login.addEventListener("submit", (e) => {
  let email = document.querySelector("#log-in-email").value;
  let password = document.querySelector("#log-in-password").value;
  e.preventDefault();
  //fetching the users data
  fetch("./get-users-data")
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      //log in code
      //searching if the email is registered and if so we store its index
      let index = json.findIndex((e) => {
        return e["email"] == email;
      });
      //if we get -1 this means that email isn't registered
      if (index == -1) {
        document.querySelector("#log-in-email").value = "";
        document.querySelector("#log-in-password").value = "";
        alert("This e-mail is not registered");
        return;
      }
      //if we get an index we check whither the password registered with that email
      if (json[index]["password"] === password) {
        //if we get a match we navigate to our home page
        sessionStorage.setItem("user-email", email);
        window.location.assign("./website-assets/home/home.html");
      } else {
        // if not we display a message to our user to show him he entered wrong data
        document.querySelector("#log-in-email").value = "";
        document.querySelector("#log-in-password").value = "";
        alert("Wrong e-mail or Password");
      }
    });
});

signup.addEventListener("submit", (e) => {
  let email = document.querySelector("#sign-up-email").value;
  let password = document.querySelector("#sign-up-password").value;
  e.preventDefault();
  //fetching the users data
  fetch("/get-users-data")
    .then((res) => res.json())
    .then((json) => {
      //sign up code
      //searching if the email is registered and if so we store its index
      let index = json.findIndex((e) => {
        return e["email"] == email;
      });
      if (index != -1) {
        document.querySelector("#sign-up-email").value = "";
        document.querySelector("#sign-up-password").value = "";
        alert("This email is already registered");
        return;
      }
      //if the email isn't registered we post it on our json file
      let newUSer = {
        email: email,
        password: password,
      };
      //we send post request to the server with the new email and password to post it
      const post = async (url,data) => {
        await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
      };
      post('/post-users-data',newUSer);
      //after we post it we redirect our new user to our home page
      sessionStorage.setItem("user-email", email);
      window.location.assign("./website-assets/home/home.html");
    });
});
