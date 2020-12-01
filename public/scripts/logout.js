    // Logout any logged in users if visiting index.html
    function logout() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          console.log(`Info: ${user.displayName}`);
          firebase.auth().signOut().then(function () {
            console.log("Success: log out");
          }).catch(function (error) {
            console.warn("Error: log out failed");
          })
        } else {
          console.log("Log: no user available.")
        }
      });
    }
    logout();