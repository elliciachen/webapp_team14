function displayFruits() {

    var items = [];
    localStorage.setItem("item", JSON.stringify(items));
    var seats = localStorage.getItem("seats");
    localStorage.setItem("tables", seats);

    var tables = localStorage.getItem("tables");
    tables.setItem
    console.log(seats);
    $("#tablesAdded").append('<p>Number of seats: ' + tables + '</p>');
}
displayFruits();