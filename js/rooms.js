var API_URL = {
    READ: 'http://localhost:8080/rooms'
};

window.Rooms = {
    getRow: function(room) {
        return `<div class="col-md-1"></div>
                <div class="col-md-1">
            <a class="btn btn-default btn-lg" role="button" href="room.html?id=${room.id}">Room ${room.roomNumber}</a>
            </div>`;
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET",
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (rooms) {
            console.info('done: rooms', rooms);

            
            Rooms.display(rooms);
        });
    },

    display: function(rooms) {
        var rows = '';
        var i;
        
        for (i = 0; i < 5; i++) { 
            rows += Rooms.getRow(rooms[i]);
        }
        $('#room1-5').html(rows);

        var rows1 = '';
        for (i = 5; i < 10; i++) { 
            rows1 += Rooms.getRow(rooms[i]);
        }
        $('#room6-10').html(rows1);
    }
};

console.info('loading room');
Rooms.load();


