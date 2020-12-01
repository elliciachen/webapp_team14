function readQuote() {


    // reading from the database
    db.collection("Restaurants").doc("RestaurantID").collection("tables").
    // call back function (function (snap) {.......})
    get().then(function (querySnapshot) {        
        querySnapshot.forEach(function (doc) {

            // doc.data() is never undefined for query doc snapshots
            var st = {
                "width": "80px",
                "height": "80px",
                "padding-top": "25px",

                "border-radius": "50%",
                "text-align": "center",
                "background-color": "#6F99FC",
            };
            var btstyle = {
                "display": "block",
            };

            // var p2 = $("<a>" + doc.data().seats + "</a>").css(st)
            //     .attr("type", "button").attr("href", "table-info.html").click(function () {
            //         localStorage.setItem("seats", doc.data().seats);
            //     });


            var b1 = $("<a id='" + doc.id + "slot1' type='button'class='btn btn-success'>4-6 PM</a>").css(st).click(function () {
                
                db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(doc.id)
                    .update({
                        slot1: false
                    })
            });

            var b2 = $("<a id='" + doc.id + "slot2' type='button'class='btn btn-success'>6-8 PM</a>").css(st).click(function () {
                db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(doc.id)
                    .update({
                        slot2: false
                    })
            });


            var b3 = $("<a id='" + doc.id + "slot3' type='button'class='btn btn-success'>8-10 PM</a>").css(st).click(function () {
                db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(doc.id)
                    .update({
                        slot3: false
                    })
            });


            if (doc.data().slot1) {
                console.log("turn this table red " + doc.id);
                b1.css("background-color", "red");
            }
            if (doc.data().slot2) {
                console.log("turn this table red " + doc.id);
                b2.css("background-color", "red");
            }

            if (doc.data().slot3) {
                console.log("turn this table red " + doc.id);
                b3.css("background-color", "red");
            }

            var divone = $("<div style='display:flex'></div>").append(b1);
            var divtwo = $("<div style='display:flex'></div>").append(b2);
            var divthree = $("<div style='display:flex'></div>").append(b3);
            // "<div class='card' style='width: 18rem;'>" +
            // "<div class='card-body'>" +
            // "<div style='display:flex;'>" +
            // p2 +
            // "<button id='" + doc.id + "slot1' type='button'class='btn btn-success'>4-6 PM</button>" +
            // "<button id='" + doc.id + "slot2' type='button'class='btn btn-success'>6-8 PM</button>" +
            // "<button id='" + doc.id + "slot3' type='button'class='btn btn-success'>8-10 PM</button>"
            // "</div>" +
            // "</div>" +
            // "</div)"
            //);
            $("#div1").append(divone);
            $("#div1").append(divtwo);
            $("#div1").append(divthree);


            // ver bds1=$(" <button type=button class=btn btn-primary>Primary</button>");

            /* <button type="button" class="btn btn-secondary">Secondary</button>
            <button type="button" class="btn btn-success">Success</button> */


            // var d1 = $("<div></div>").append(p2).append($("<div></div>").append(
            //     "<div class='card' style='width: 18rem;'>" +
            //     "<div class='card-body'>" 
            //     + $('p2').val() +
            //     "<div style='display:flex;'>" +
            //     "<button id='" + doc.id + "slot1' type='button'class='btn btn-success'>4-6 PM</button>" +
            //     "<button id='" + doc.id + "slot2' type='button'class='btn btn-success'>6-8 PM</button>" +
            //     "<button id='" + doc.id + "slot3' type='button'class='btn btn-success'>8-10 PM</button>" +
            //     "</div>" +
            //     "</div>" +
            //     "</div)"));
        });
    });

}


readQuote();

// function updateTable(restaurant) {
//     db.collection("Restaurants")
//         .doc("RestaurantID")
//         .collection("tables")
//         .get() //gets a collection of tables
//         .then(function (snap) {
//             snap.forEach(function (doc) {

//                 console.log(doc.data());
//                 if (doc.data().slot1) {
//                     console.log("turn this table red " + doc.id);
//                     document.getElementById(doc.id + "slot1").style.backgroundColor = "red";
//                 }
//                 if (doc.data().slot2) {
//                     console.log("turn this table red " + doc.id);
//                     document.getElementById(doc.id + "slot2").style.backgroundColor = "red";
//                 }
//                 if (doc.data().slot3) {
//                     console.log("turn this table red " + doc.id);
//                     document.getElementById(doc.id + "slot3").style.backgroundColor = "red";
//                 }
//             })
//         })
// }
// updateTable();



// document.getElementById("demo").innerHTML = doc.data().seats;
// .attr("class", "tb btn btn-primary rounded-circle")

// console.log(doc.id, " => ", doc.data());

// console.log(snap.data());
// console.log(snap.data().seats);
// document.getElementById("abc").innerText = snap.data().message;
//.attr("id", doc.id)