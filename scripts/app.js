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
                "margin": "5% 0px 10% 30%",
                "border-radius": "50%",
                "text-align": "center",
                "background-color": "#6F99FC",
            };

            var p2 = $("<a>" + doc.data().seats + "</a>").css(st)
                .attr("type", "button").attr("href", "table-info.html").click(function () {
                    localStorage.setItem("seats", doc.data().seats);
                });
            $("#div1").append(p2);



            // document.getElementById("demo").innerHTML = doc.data().seats;
            // .attr("class", "tb btn btn-primary rounded-circle")

            // console.log(doc.id, " => ", doc.data());

            // console.log(snap.data());
            // console.log(snap.data().seats);
            // document.getElementById("abc").innerText = snap.data().message;
        });
    });


}
readQuote();