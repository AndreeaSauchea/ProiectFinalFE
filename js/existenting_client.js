var API_URL = {
    READ: 'http://localhost:8080/clients/cnp/',
    READBOOKED: 'http://localhost:8080/bookedrooms/client/'
};

window.ExistingClient = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const cnp = urlParams.get('cnp');
        console.info('cnp works', cnp);
        $.ajax({
            url: API_URL.READ + cnp,
            method: "GET"
        }).done(function (existClient) {
            console.info('done: existClient', existClient);

            ExistingClient.display(existClient);
            ExistingClient.getBookedRoom(existClient);
        });
    },

   display: function(existClient) {
        $('#lastname').html(existClient.name);
        $('#firstname').html(existClient.forename);
        $('#birthday').html(existClient.birthday);
        $('#cnp').html(existClient.cnp);
        $('#TypeID').html(existClient.typeID);
        $('#SeriesID').html(existClient.seriesID);
        $('#NumberID').html(existClient.numberID);
    },

    getBookedRoom: function(existClient){
        const id = existClient.id;
        console.info('clientID works', id)
        $.ajaxSetup({
            error: function(xhr){
                alert('Request Status: ' + xhr.status + ' Status Text: This client does not have a room assigned yet' );
                var x = document.getElementById("booked");
                x.style.display = "none";
            }
        });
        $.ajax({
            url: API_URL.READBOOKED + id,
            method: "GET",
        }).done(function (bookedroom) {
            console.info('done: bookedroom', bookedroom);
            var x = document.getElementById("booked");
            if(bookedroom.room != 0){
                console.info('booked', bookedroom.room)
                x.style.display = "block";
                room = bookedroom.room;
                ExistingClient.displayBooked(bookedroom)
            } else{
                x.style.display = "none";
            }

        });
    },

    displayBooked: function(bookedroom){
        console.info("we want room", bookedroom.room)
        $('#room').html(bookedroom.room);
    },

}
ExistingClient.load();
