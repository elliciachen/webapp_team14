function displayFruits() {

    // var items = [];
    // localStorage.setItem("item", JSON.stringify(items));
    // var seats = localStorage.getItem("seats");


    var tables = localStorage.getItem("tableArray");
    var t = JSON.parse(tables);
    console.log(t);
    // var st = {
    //     "width": "80px",
    //     "height": "80px",
    //     "padding-top": "25px",
    //     "margin": "5% 0px 10% 30%",
    //     "border-radius": "50%",
    //     "text-align": "center",
    //     "background-color": "#6F99FC",
    // };

    t.forEach(function (ff) {
        var div1 = $('<div class="card w-75"></div>')
        var head = $('<h5 class="card-title">Card title</h5>');
        var tableDisicription = $('<p>Number of seats: ' + ff + '</p>');
        var p1 = $('<a href="#" class="btn btn-primary" style="margin-left: auto;">Delete</a>').click(function () {
            const index = t.indexOf(ff);
            console.log(index);
            t.splice(index, 1);
            div1.remove();
        });
        var div2 = $('<div class="card-body divin" style="display: flex;"></div>').append(tableDisicription);
        div2.append(p1);
        div1.append(head);
        div1.append(div2);


        $("#tablesAdded").append(div1);

        // $("#tablesAdded").append('<div class="card w-75">' +
        //     '<h5 class="card-title">Card title</h5>' +
        //     '<div class="card-body divin" style="display: flex;">' +
        //     '<p>Number of seats: ' + ff + '</p>' +
        //     ' <a href="#" class="btn btn-primary" style="margin-left: auto;">Delete</a>' +
        //     '</div>' +
        //     '</div>');


        $(".plusVutton").click(function () {
            localStorage.setItem("tableArray", JSON.stringify(t));
        });
    });


}
displayFruits();