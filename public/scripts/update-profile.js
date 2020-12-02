    // Check if there is a valid user,
    // if valid, pass new user info object to loadUserInfo,
    // otherwise redirect to index page
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

    // Get user details from database and display in placeholder attribute
    function loadUserInfo(user) {
      let {
        email,
        name,
        phone
      } = user;

      console.log(email);
      console.log(name);
      console.log(phone);

      $("#email").attr({
        placeholder: email
      });
      $("#name").attr({
        placeholder: name
      });
      $("#phone").attr({
        placeholder: phone
      });
    }

    // On click "update" button, 
    //if field for original password has values, function will call grabUserInput
    //else set field to invalid input
    function updateProfile() {
      $(".card-footer").on("click", "#update-profile", function () {
        if ($("#old-pass").val().length < 1) {
          $("#old-pass").attr("class", "form-control is-invalid");
        } else {
          $("#old-pass").attr("class", "form-control");
          grabUserInput();
          $("#new-pass").val("");
          $("#old-pass").val("");
        }
      });
    }
    updateProfile();

    // Get user input from profile text fields
    // If there is no input, then get the placeholder attribute value
    // Call reauthenticate to start profile update
    function grabUserInput() {
      let userInfo = {
        email: $("#email").attr("placeholder"),
        name: ($("#name").val().length > 0) ? $("#name").val() : $("#name").attr("placeholder"),
        phone: ($("#phone").val().length > 0) ? $("#phone").val() : $("#phone").attr("placeholder"),
        newPass: $("#new-pass").val(),
        oldPass: $("#old-pass").val()
      };

      reauthenticate(userInfo);
    }

    // Reauthenticate for updating profile
    // access current user document from database
    // If password is not changed,
    //  pass current user, user document, and new user data from grabUserInput to updateProfileNoNewPass
    // if password is changed, 
    //  pass current user, user document, and new user data from grabUserInput toupdateProfileNewPass
    function reauthenticate(userData) {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          let {
            email,
            name,
            phone,
            newPass,
            oldPass
          } = userData;
          let credential = firebase.auth.EmailAuthProvider.credential(email, oldPass);
          user.reauthenticateWithCredential(credential)
            .then(function () {
              let userDB = db.collection("users").doc(user.uid);
              if (newPass.length < 1) {
                updateProfileNoNewPass(user, userDB, userData);
              } else {
                updateProfileNewPass(user, userDB, userData);
              }
            })
            .catch(function (error) {
              console.warn("Error: wrong pasword!");
            });
        } else {
          console.warn("No user found!");
        }
      });
    }

    // Update profile without new password
    // Update firebase authenticated users database
    // Update app firestore database (user document)
    // Requires current user, user document, and new user data from grabUserInput
    function updateProfileNoNewPass(user, doc, userData) {
      user.updateProfile({
          displayName: userData.name
        })
        .then(function () {
          doc.update({
            "name": userData.name,
            "phone": userData.phone
          }).then(function () {
            window.location.href = "profile.html";
          });
        });
    }


    // Update profile with new password
    // Requires current user, user document, and new user data from grabUserInput
    // Update firebase authenticated users database
    // Update app firestore database (user document)
    // Logout user and redirect to index.html
    function updateProfileNewPass(user, userDB, userData) {
      user.updateProfile({
          displayName: userData.name
        })
        .then(function () {
          userDB.update({
            "name": userData.name,
            "phone": userData.phone
          }).then(function () {
            user.updatePassword(userData.newPass)
              .then(function () {
                firebase.auth().signOut().then(function () {
                  console.log("Success: log out");
                  window.location.href = "index.html";
                }).catch(function (error) {
                  console.warn("Error: log out failed");
                });
              }).catch(function () {
                console.warn("Error: password update failed!");
              });
          });
        });
    }

    // On click "cancel", redirect to profile.html
    // Consider to merge profile-edit.html with profile.html
    function cancelEditProfile() {
      $(".card-footer").on("click", "#cancel-edit", function () {
        window.location.href = "profile.html";
      });
    }
    cancelEditProfile();