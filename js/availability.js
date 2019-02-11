var API_URL = {
    READ: 'http://localhost:8080/rooms/available'
};

window.Availability = {

    load: function(){
        $(".add-form").submit(function() {
            const available = {
                checkIn: $('input[name=checkIn]').val(),
                checkOut: $('input[name=checkOut]').val(),
                numberOfPersons: $('input[name=numberOfPersons]').val(),
            };

            Availability.check(available);

        });
    },

    check: function(available){
        console.info("body", JSON.stringify(available, null, 2))
        $.ajax({
            url: API_URL.READ,
            headers: {

                "Content-Type": "application/json"
            },
            method: "POST",
            data: JSON.stringify(available, null, 2),
            success: function() {
                console.info ('We made it')
              }
        }).done(function (response) {
                console.info('camere', response);
                if(response.length == 0){
                    alert("There are no available rooms for this dates!")
                    location.reload(true);
                }
                Availability.availableRooms(response);

        });
    },

    availableRooms: function(response){
        var rows = '';

        response.forEach(roomNumber => rows += Availability.getRow(roomNumber));
        $('#table-overrides tbody').html(rows);
    },

    getRow: function(roomNumber) {
        return `<tr>
            <td>${roomNumber.roomNumber}</td>
        </tr>`;
    }
}

Availability.load();
