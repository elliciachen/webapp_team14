    // Check if there is a valid user, 
    // if valid, get current user' reservations from database
    //  3 calls for different reservation states, 1 to get current, 1 to get completed, and 1 to get outdated
    // otherwise redirect to index page
    function checkUser() {
      firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
          let current = 0;
          let complete = 1;
          let outdated = -1;
          console.log("Valid user.");
          getReservation(current, "current");
          getReservation(complete, "completed");
          getReservation(outdated, "outdated");

        } else {
          console.warn("Error: no user available.");
          $("body").children().remove();
          $("body").append(
            '<div class="alert alert-warning mt-3"><strong>Warning!</strong><p>There is no user logged in!</p></div>'
          );
          window.setTimeout(function () {
            window.location.href = "index.html";
          }, 2000);

        }
      });
    }
    checkUser();

    // Cancel reservations
    // Remove reservation from website
    // Get reservation doc id from reservation container class value,
    // Pass doc id to deleteReservation to delete from database
    function cancelReservation() {
      $(".reservation-history-container").on("click", "#cancel-reservation", function (event) {
        let alert =
          '<div class="alert alert-warning" role="alert">' +
          'Select "cancel" again to processed with cancelation' +
          '</div>';
        // $(event.target).parent().parent().parent().remove();
        if ($(event.target).hasClass("confirm-cancel")) {
          $(event.target).parent().parent().parent().remove();
          let id = $(event.target).parent().parent().parent().attr('class').split(' ')[0];
          deleteReservation(id);
        } else {
          $(event.target).toggleClass("confirm-cancel");
          $(event.target).parent().prepend(alert);
        }
      });
    }
    cancelReservation();

    // Delete reservation from database
    // Requires reservation doc id
    function deleteReservation(idValue) {
      console.log("restID", idValue);
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("reservations").doc(idValue)
          .delete()
          .then(function () {
            console.log("Reservation deleted successful");
          }).catch(function(error) {
            console.warn("Could not delete reservation");
          });
      });
    }


    // filter reservations from database
    // Filter reservations based on state and pass in the relevant id for html generation
    // 0 => current
    // 1 => completed
    // -1 => outdated
    function getReservation(state, type) {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).collection("reservations")
          .where("state", "==", state)
          .get()
          .then(function (snap) {
            snap.forEach(function (doc) {
              let reserveInfo = {
                "id": doc.id,
                "state": doc.data().state,
                "confirmNum": doc.data().confirmNum,
                "restName": doc.data().restName,
                "restLocation": doc.data().restLocation,
                "time": doc.data().appointment,
                "tables": doc.data().tables
              };
              // Start html generation
              generateReservation(type, reserveInfo);
            });
          });
      });
    }

    // Reservation html template
    const Reservation = ({
      id,
      state,
      confirmNum,
      restName,
      restLocation,
      day,
      date,
      hour
    }) => `
    <div class="${id} mb-2">
        <button class="accordion border">
          <h6 class="reservation-heading">${restName}</h6>
          <h6 class="reservation-time">${day}, ${date}, ${hour}</h6>
        </button>
        <div class="panel pt-2">
          <div class="row align-items-center">
            <p class="col-sm-3 font-weight-bold">Confirmation Number</p>
            <p class="col-sm-9 confirm-num lead">${confirmNum}</p>
          </div>
          <div class="row">
            <p class="col-sm-3 font-weight-bold">Restaurant</p>
            <p class="col-sm-9 rest-name lead">${restName}</p>
          </div>
          <div class="row">
            <p class="col-sm-3 font-weight-bold">Location</p>
            <p class="col-sm-9 rest-location lead">${restLocation}</p>
          </div>
          <div class="row">
            <p class="col-sm-3 font-weight-bold">Time</p>
            <p class="col-sm-9 app-time lead">${day}, ${date}, ${hour}</p>
          </div>
          <table class="table text-center reservation-table-list ${id}">
            <thead>
              <tr>
                <th>Table</th>
                <th>Seats</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
          <div class="text-center">
            <button type="button" class="btn btn-secondary px-5 m-2" id="cancel-reservation">Cancel</button>
          </div>
        </div>
      </div>
    `;

    // Reservation table html tempate
    const Table = ({
      table,
      seats
    }) => `
          <tr>
            <td>${table}</td>
            <td>${seats}</td>
          </tr>
    `;

    // Set string representation of state given the numerical representation of the state
    function setState(stateNum) {
      return stateNum === -1 ? "Outdated" : stateNum === 1 ? "Completed" : "In Progress";
    }

    // Display reservations under the correct section
    function generateReservation(idString, data) {
      // Setup variables
      let {
        id,
        state,
        confirmNum,
        restName,
        restLocation,
        time
      } = data;
      state = setState(state);
      time = time.toDate();
      let day = ['Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday'
      ][time.getDay()];
      let date = time.toLocaleDateString();
      let hour = time.toLocaleTimeString();

      // Apply reservation html template
      $(`#${idString}`).after([{
        id,
        state,
        confirmNum,
        restName,
        restLocation,
        day,
        date,
        hour
      }].map(Reservation).join(""));

      // Apply table html template
      let tables = data.tables;
      for (const [table, seats] of Object.entries(tables)) {
        $(`table.${id} > tbody`).append([{
          table,
          seats
        }].map(Table).join(''));
      }
    }

    // Create accordion style animation for reservation list
    // Learned from w3school accordion example
    // Change to bootstrap version when all other stuff are done
    $(".container").on("click", ".accordion", function (event) {
      $(this).toggleClass("active-accordion");
      let panel = $(this).next();
      if ($(panel).css("display") === "block") {
        $(panel).css("display", "none");
      } else {
        $(panel).css("display", "block");
      }
    })