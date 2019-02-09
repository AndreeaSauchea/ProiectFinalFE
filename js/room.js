var API_URL = {
    READ: 'http://localhost:8080/rooms/',
    READBOOKED: 'http://localhost:8080/bookedrooms/room/',
    ADD: 'http://localhost:8080/bookedroom/{roomId}/activity/{activityId}/add',
    REMOVE: 'http://localhost:8080/bookedroom/{roomId}/activity/{activityId}/remove'
};


window.Room = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.info('id works', id);
        $.ajax({
            url: API_URL.READ + id,
            method: "GET"
        }).done(function (room) {
            console.info('done: room', room);

            
            Room.display(room);
        });
    },

    display: function(room) {
        $('#name').html(room.roomNumber);
        $('#places').html(room.numberPlaces);
        $('#price').html(room.nightlyPrice);
    },

    getBookedRoom: function(){
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.info('roomId works', id)
        $.ajax({
            url: API_URL.READBOOKED + id,
            method: "GET"
        }).done(function (bookedroom) {
            console.info('done: bookedroom', bookedroom);
            
            var x = document.getElementById("booked");
            if(bookedroom.client){
                x.style.display = "block";
                Room.displayBooked(bookedroom)
                Room.displayActivities(bookedroom.serviceList);
            } else{
                x.style.display = "none";
            }

        });
    },

    displayBooked: function(bookedroom){
        $('#client').html(bookedroom.client);
        $('#duration').html(bookedroom.duration);
    },

    getRow: function(activity) {
        return `<tr>
            <td>${activity.serviceName}</td>
            <td>${activity.servicePrice}</td>
            <td>
                <a href='#' data-id='${activity.id}' class='delete'>&#10006;</a>
            </td>
        </tr>`;
    },

    getActionRow: function() {
        return '<tr>' +
            '<td><input type="text" name="serviceName" placeholder="Activity name"></td>' +
            '<td><input type="number" required name="servicePrice" placeholder="Price"></td>' +
            '<td><button type="submit">Save</button></td>' +
            '</tr>';
    },

    delete: function(activityId) {
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('id');
        console.info('roomId works', id)
        $.ajax({
            url: API_URL.REMOVE.replace("{roomId}", roomId).replace("{activityId}", activityId),
            method: "PUT"
        }).done(function () { 
        });
    },

    add: function(person) {
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('id');
        console.info('roomId works', id)
        $.ajax({
            url: API_URL.ADD.replace("{roomId}", roomId).replace("{activityId}", activityId),
            method: "PUT"
        }).done(function () { 
        });
    },


    bindEvents: function() {
        $('#phone-book tbody').delegate('a.edit', 'click', function () {
            var id = $(this).data('id');
            PhoneBook.edit(id);
        });

        $('#phone-book tbody').delegate('a.delete', 'click', function () {
            var id = $(this).data('id');
            console.info('click on ', this, id);
            PhoneBook.delete(id);
        });

        $( ".add-form" ).submit(function() {
            const person = {
                firstName: $('input[name=firstName]').val(),
                lastName: $('input[name=lastName]').val(),
                phone: $('input[name=phone]').val()
            };

            if (editId) {
                person.id = editId;
                PhoneBook.save(person);
            } else {
                PhoneBook.add(person);
            }
        });
    },

    
    displayActivities: function(serviceList) {
        var rows = '';

        serviceList.forEach(activity => rows += Room.getRow(activity));
        rows += Room.getActionRow();
        $('#table-overrides tbody').html(rows);
    }
    
}

console.info('loading room');
var bookedroom = '';
Room.load();
Room.getBookedRoom();