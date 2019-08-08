var API_URL = {
    UPDATE: 'http://localhost:8080/rooms/'
};

window.EditRoom = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const nightlyPrice = urlParams.get('nightlyPrice');
        const numberPlaces = urlParams.get('numberPlaces');
        console.info('roomNumber works', name);
        console.info('nightlyPrice works', nightlyPrice);
        console.info('numberPlaces works', numberPlaces);

        EditRoom.display(name, nightlyPrice, numberPlaces);
        EditRoom.getInfo();
       
    },

    display: function(name, nightlyPrice, numberPlaces){
        console.info('room number works', name);
        document.getElementById("name").value = name;
        document.getElementById("nightlyPrice").value = nightlyPrice;
        document.getElementById("numberPlaces").value = numberPlaces;
    },

    getInfo: function(){
        $(".add-form").submit(function() {
            const room = {
                nightlyPrice: $('input[name=nightlyPrice]').val(),
                numberPlaces: $('input[name=numberPlaces]').val(),
            };

            console.info("we made it to here", room)
            EditRoom.edit(room);
        });

    },

    edit: function(room) {
        console.log();
        console.info("mata", room)
        $.ajax({
            url: API_URL.UPDATE + document.getElementById("name").value,
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            data: JSON.stringify(room, null, 2),
            success: function() {
                console.info ('We made it'),
                alert('Edited room');
                window.open("room.html?id=" + document.getElementById("name").value, "_self");
              },
              error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (response) {
            if (response.success) {
                console.info('room', response);
            }
        });
    },

}
EditRoom.load();
