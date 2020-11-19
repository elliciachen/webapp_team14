function displayFruits() {
    // Method2:  Use localStorage
    var seats = localStorage.getItem("seats");
    console.log(seats);
    $(".seatsNumber").append('<p>Number of seats: '+seats+'</p>');
}
displayFruits();