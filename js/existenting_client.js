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
            method: "GET",
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (existClient) {
            console.info('done: existClient', existClient);

            ExistingClient.display(existClient);
            ExistingClient.getBookedRoom(existClient);
        });
    },

   display: function(existClient) {
        $('#name').html(existClient.name);
        $('#forename').html(existClient.forename);
        $('#birthday').html(existClient.birthday);
        $('#cnp').html(existClient.cnp);
        $('#typeID').html(existClient.typeID);
        $('#seriesID').html(existClient.seriesID);
        $('#numberID').html(existClient.numberID);
        $('#street').html(existClient.street);
        $('#streetNumber').html(existClient.streetNumber);
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
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
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


    send: function(){
        $("#btn").click( function() {
            console.info("we are here")
            var url = "edit_client.html?cnp=" + document.getElementById("cnp").innerHTML + "&name=" + document.getElementById("name").innerHTML + "&forename=" + document.getElementById("forename").innerHTML + "&birthday=" + document.getElementById("birthday").innerHTML + "&typeID=" + document.getElementById("typeID").innerHTML + "&seriesID=" + document.getElementById("seriesID").innerHTML + "&numberID=" + document.getElementById("numberID").innerHTML + "&street=" + document.getElementById("street").innerHTML + "&streetNumber=" + document.getElementById("streetNumber").innerHTML;
            console.info("we might have done sth wit cnp", document.getElementById("cnp").innerHTML)
            window.open(url, "_self");
        });
    }
    

}
ExistingClient.load();
console.info("I am here");
ExistingClient.send();
console.info("Now I am here");
