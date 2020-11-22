function displayFruits() {
    // Method2:  Use localStorage
    var seats = localStorage.getItem("seats");
    console.log(seats);
    $(".seatsNumber").append('<p>Number of seats: ' + seats + '</p>');

    var tables = localStorage.getItem("tableArray");
    var t = JSON.parse(tables);
    t.push(seats);
    localStorage.setItem("tableArray", JSON.stringify(t));
}
displayFruits();