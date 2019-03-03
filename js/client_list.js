var API_URL = {
    READ: 'http://localhost:8080/bookedrooms/history'
};

window.ClientsHistory = {
    getRow: function(client) {
        return `<tr>
            <td>${client.firstName}</td>
            <td>${client.lastName}</td>
            <td><a class="btn btn-default btn-lg" role="button" href="room.html?id=${client.roomId}">Room ${client.room}</a></td>
            <td>${client.checkIn}</td>
            <td>${client.checkOut}</td>
        </tr>`;
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET",
            error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (historyList) {
            console.info('done: history', historyList);

            
            ClientsHistory.display(historyList);
        });
    },

    display: function(historyList) {
        var rows = '';

        historyList.forEach(client => rows += ClientsHistory.getRow(client));
        $('#table-overrides tbody').html(rows);
    }

};

console.info('loading persons');
ClientsHistory.load();