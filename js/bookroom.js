var API_URL = {
    CREATE: 'http://localhost:8080/bookedrooms'
};

window.BookRoom = {

    load: function(){
        console.info("We are here")
        $(".add-form").submit(function() {
            const bookroom = {
                cnp: $('input[name=cnp]').val(),
                room: $('input[name=room]').val(),
                checkIn: $('input[name=checkIn]').val(),
                checkOut: $('input[name=checkOut]').val(),
            };
                console.info("This is the request", bookroom)
                BookRoom.save(bookroom);

        });
    },

    save: function(bookroom) {
        console.log(bookroom);
        console.info(JSON.stringify(bookroom, null, 2));
        $.ajax({
            url: API_URL.CREATE,
            headers: {

                "Content-Type": "application/json"
            },
            method: "POST",
            data: JSON.stringify(bookroom, null, 2),
            success: function() {
                console.info ('We made it'),
                alert('Booked a room');
                location.reload(true);
              },
            error: function(err){
                console.info("something is wrong", err);
            } 
        }).done(function (response) {
            if (response.success) {
                console.info('person', response);
            }
        });
    },


}
BookRoom.load();