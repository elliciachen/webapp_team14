function displayTableInfo() {

    // Useing localStorage
    var seats = localStorage.getItem("seats");
    console.log(seats);
    $(".seatsNumber").append('<p>Number of seats: ' + seats + '</p>');

    var slot = localStorage.getItem("slotnum");
    console.log(slot);


    if (slot == "slot1") {
        $(".card-text").append('<p>Time 4-6 PM</p>');
    }

    if (slot == "slot2") {
        $(".card-text").append('<p>Time 6-8 PM</p>');
    }
    if (slot == "slot3") {
        $(".card-text").append('<p>Time 8-10 PM</p>');
    }





    // Future Work

    // var tables = localStorage.getItem("tableArray");
    // var tab = JSON.parse(tables);
    // tab.push(seats);
    // localStorage.setItem("tableArray", JSON.stringify(tab));

    // var times = localStorage.getItem("timeArray");
    // var tim = JSON.parse(times);
    // tim.push(tableID, slot);
    // localStorage.setItem("timeArray", JSON.stringify(tim));
}
displayTableInfo();



// change the status of slots
function myfunction() {
    var tableID = localStorage.getItem("tableid");
    console.log(tableID);

    var slot = localStorage.getItem("slotnum");
    console.log(slot);

    if (slot == "slot1") {
        db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(tableID)
            .update({
                slot1: false
            })
    }
    if (slot == "slot2") {
        db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(tableID)
            .update({
                slot2: false
            })
    }
    if (slot == "slot3") {
        db.collection("Restaurants").doc("RestaurantID").collection("tables").doc(tableID)
            .update({
                slot3: false
            })
    }

}