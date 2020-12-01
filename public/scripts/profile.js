    // Check if there is a valid user, otherwise redirect to index page
    function checkUser() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          db.collection("users")
            .doc(user.uid)
            .get()
            .then(function (doc) {
              let currentUser = {
                email: doc.data().email,
                name: doc.data().name,
                phone: doc.data().phone
              };
              loadUserInfo(currentUser);
            });
        } else {
          console.warn("Error: no user available.");
          $("body").children().remove();
          $("body").append(
            '<div class="alert alert-warning mt-3"><strong>Warning!</strong><p>There is no user logged in!</p></div>'
          );
          window.setTimeout(function () {
            window.location.href = "index.html";
          }, 500);
        }
      });
    }
    checkUser();

    // Get user details from database and diplay in browser
    function loadUserInfo(user) {
      let {
        email,
        name,
        phone
      } = user;
      console.log(email);
      console.log(name);
      console.log(phone);

      $("#email").text(email);
      $("#name").text(name);
      $("#phone").text(phone);
    }


    function editProfile() {
      $(".card-footer").on("click", "#edit-profile", function () {
        window.location.href = "profile-edit.html";
      });
    }
    editProfile();