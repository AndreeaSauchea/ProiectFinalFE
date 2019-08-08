var API_URL = {
    READ: 'http://localhost:8080/rooms/',
    READBOOKED: 'http://localhost:8080/bookedrooms/room/',
    ADD: 'http://localhost:8080/bookedroom/{roomId}/activity/{activityId}/add',
    REMOVE: 'http://localhost:8080/bookedroom/{roomId}/activity/{activityId}/remove',
    GETSERVICES: 'http://localhost:8080/services'
};


window.Room = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.info('id works', id);
        $.ajax({
            url: API_URL.READ + id,
            method: "GET",
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (room) {
            console.info('done: room', room);

            
            Room.display(room);
        });
    },

    display: function(room) {
        $('#name').html(room.roomNumber);
        $('#numberPlaces').html(room.numberPlaces);
        $('#nightlyPrice').html(room.nightlyPrice);
    },

    getBookedRoom: function(){
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.info('roomId works', id)
        $.ajaxSetup({
            error: function(xhr){
                alert('Request Status: ' + xhr.status +  ' Status Text: ' + xhr.responseJSON.message );
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
            if(bookedroom.client){
                console.info('booked', bookedroom.client)
                x.style.display = "block";
                client = bookedroom.client;
                totalPrice = bookedroom.totalPrice;
                Room.displayBooked(bookedroom)
                Room.loadService(bookedroom);
                Room.bindEvents(bookedroom);
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

    delete: function(activityId) {
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('id');
        console.info('roomId works', roomId);
        console.info('activityId works', activityId);
        $.ajax({
            url: API_URL.REMOVE.replace("{roomId}", roomId).replace("{activityId}", activityId),
            method: "PUT"
        }).done(function () { 
            location.reload(true);
        });
    },

    add: function() {
        console.info('add ', newActivityId);
        const urlParams = new URLSearchParams(window.location.search);
        const roomId = urlParams.get('id');
        console.info('roomId works', roomId);
        console.info('newActivityId works', newActivityId);
        $.ajax({
            url: API_URL.ADD.replace("{roomId}", roomId).replace("{activityId}", newActivityId),
            method: "PUT"
        }).done(function () { 
            location.reload(true);
        });
    },


    bindEvents: function(bookedroom) {

        $('#table-overrides tbody').delegate('a.delete', 'click', function () {
            var activityId = $(this).data('id');
            console.info('click on ', this, activityId);
            Room.delete(activityId);
        });

    },

    
    displayActivities: function(existingServiceList, newServiceList) {
        newServices = newServiceList;
        var rows = '';

        existingServiceList.forEach(activity => rows += Room.getRow(activity));
        rows += Room.getActionRow(newServiceList);
        $('#table-overrides tbody').html(rows);
    },

    loadService: function (bookedroom) {
        $.ajax({
            url: API_URL.GETSERVICES,
            method: "GET",
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (newServiceList) {
            console.info('done: serviceList', newServiceList);
            Room.displayActivities(bookedroom.serviceList, newServiceList);
        });
    },

    getActionRow: function(serviceList) {
        var rows = '';
        serviceList.forEach(activity => rows += `<option value = "${activity.id}">${activity.serviceName}</option>`);
        
        return `<tr>
            <td>
                <fieldset>
                    <select id = "setActivity" onChange="Room.setPrice(this);">
                        ${rows}
                    </select>
                </fieldset>
            </td>
            <td id="newPrice"></td>
            <td><button id="addButton" style="display: none;" type="submit" onClick="Room.add()">Save</button></td>
            </tr>`;
    },
    
    setPrice: function(selectObject){
        newActivityId = selectObject.value;
        var price;
        console.info('service list', newServices);
        newServices.forEach(service => {
            if(service.id == newActivityId) {
                price = service.servicePrice;
            }
        });
        console.info('activity', newActivityId)
        console.info('arrived here', price);
        $('#newPrice').html(price);
        document.getElementById("addButton").style.display = "block";
    },

    getBill: function(){
        console.info('client', client);
        console.info('totalPrice', totalPrice);

        var doc = new jsPDF();

        doc.setFont("times");
        doc.setFontStyle("bolditalic");
        doc.setFontSize(30);
        doc.text("Bill for: " + client + " ", 105, 20, null, null, 'center');

        doc.setFont("times");
        doc.setFontStyle("bold");
        doc.setFontSize(25);
        doc.text("You have to pay: " + totalPrice + " lei", 20, 50);

        doc.setFont("courier");
        doc.setFontSize(20);
        doc.text("Thank you for choosing our hotel!", 20, 70);

        doc.setFont("courier");
        doc.setFontSize(20);
        doc.text("Have a great day!", 20, 80);

        doc.setFont("times");
        doc.setFontStyle("bolditalic");
        doc.setFontSize(20);
        doc.text("Client, ", 20, 100);

        doc.setFont("times");
        doc.setFontStyle("bolditalic");
        doc.setFontSize(20);
        doc.text("Hotel, ", 170, 100);

        doc.save(`${client}.pdf`);
    },

    send: function(){
        $("#edit").click( function() {
            console.info("we are here")
            var url = "edit_room.html?name=" + document.getElementById("name").innerHTML  + "&nightlyPrice=" + document.getElementById("nightlyPrice").innerHTML + "&numberPlaces=" + document.getElementById("numberPlaces").innerHTML;
            console.info("we might have done sth with roomNumber", document.getElementById("name").innerHTML);
            console.info(url);
            window.open(url, "_self");
        });
    },
    
}

console.info('loading room');
var bookedroom;
var newServices;
var newActivityId;
var client;
var totalPrice;
Room.load();
console.info('I am here');
Room.getBookedRoom();
Room.send();
console.info('bla bla bla');