//--------------------------------------------------------------------------------------
// Create the framework of the card grid, with id's for where we want to stick things in
//--------------------------------------------------------------------------------------
function createGrid(restaurant) {
    console.log("inside createGrid");
    db.collection("Restaurants")
        .doc("RestaurantID")
        .collection("tables")
        .get()
        .then(function (snap) {
            console.log(snap.size);

            // start the grid and row
            var message =
                "<div class='container'>" +
                "<div class='row'>";

            // create one column for every table
            snap.forEach(function (doc) {
                console.log("create a column and one card");
                console.log(doc.id);
                var docid = doc.id;
                message = message +
                    "<div class='col text-center col-md-6' id='card" +
                    docid // id's will be like "card34dfad324134"
                    +
                    "'>" +
                    "</div>";
            })

            // end the grid and row
            message = message +
                "</div>" +
                "</div>";

            // attach grid to the right spot
            console.log(message);
            $("#div1").append(message);
        })
}
createGrid("Whitespot");

//------------------------------------------------------------------------
//  This function will dynamically created a circle (for the dining table)
//  and three buttons for the slots, and attach them into the grid slot
//  that was created with createGrid()
//------------------------------------------------------------------------
function displayAllTables(restaurant) {
    console.log(restaurant);
    db.collection("Restaurants")
        .doc("RestaurantID")
        .collection("tables")
        .get()
        .then(function (snap) { //snap is collection of tables
            snap.forEach(function (doc) {
                var seats = doc.data().seats;
                console.log(seats);


                var chair = $("<i class='fas fa-chair'></i>");

                // create the dining table-circles; lets use a button, no listener
                var t = $("<button class='btn btn-table'>" + seats + "</button><br><br>").append(" ").append(chair);

                // create the 3 time-slot buttons
                var b1 = $("<a id='slot1" + doc.id +
                    "' type='button' class='buttonST btn-danger center'>4-6 PM</a><br>").attr("href", "table-info.html").click(function () {
                    localStorage.setItem("seats", doc.data().seats);
                    localStorage.setItem("tableid", doc.id);
                    localStorage.setItem("slotnum", 'slot1');
                    console.log(doc.data().slot1);
                });


                var b2 = $("<a id='slot2" + doc.id +
                    "' type='button' class='buttonST btn-danger center'>6-8 PM</a><br>").attr("href", "table-info.html").click(function () {
                    localStorage.setItem("seats", doc.data().seats);
                    localStorage.setItem("tableid", doc.id);
                    localStorage.setItem("slotnum", 'slot2');
                });

                var b3 = $("<a id='slot3" + doc.id +
                    "' type='button' class='buttonST btn-danger center'>8-10 PM</a><br>").attr("href", "table-info.html").click(function () {
                    localStorage.setItem("seats", doc.data().seats);
                    localStorage.setItem("tableid", doc.id);
                    localStorage.setItem("slotnum", 'slot3');
                });

                // attach the table-circle, and 3 buttons to the right place, in card
                $("#card" + doc.id).append(t);
                $("#card" + doc.id).append(b1).append(b2).append(b3);

                // Call the add listener funcion there to:
                //    Add listeners to each button.
                //    In the handler, update slots info in the database, then change colour of button
                //
                //$("#slot1"+doc.id).click()
                //$("#slot2"+doc.id).click()
                //$("#slot3"+doc.id).click()
                //
            })
        });
}
displayAllTables("Whitespot");

// update the colors of tables
function updateTableButtons(restaurant) {
    db.collection("Restaurants")
        .doc("RestaurantID")
        .collection("tables")
        .get() //gets a collection of dining tables
        .then(function (snap) {
            snap.forEach(function (doc) { //for each table
                console.log(doc.data());
                if (doc.data().slot1) {
                    console.log("turn this table red " + doc.id);
                    document.getElementById("slot1" + doc.id).style.backgroundColor = "#007bff";
                    document.getElementById("slot1" + doc.id).onclick = "return false";
                }
                if (doc.data().slot2) {
                    console.log("turn this table red " + doc.id);
                    document.getElementById("slot2" + doc.id).style.backgroundColor = "#007bff";
                }
                if (doc.data().slot3) {
                    console.log("turn this table red " + doc.id);
                    document.getElementById("slot3" + doc.id).style.backgroundColor = "#007bff";
                }
            })
        })
}
updateTableButtons("Whitespot");