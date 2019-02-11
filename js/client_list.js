var API_URL = {
    READ: 'http://localhost:8080/bookedrooms/history'
};

window.ClientsHistory = {
    getRow: function(client) {
        return `<tr>
            <td>${client.firstName}</td>
            <td>${client.lastName}</td>
            <td>${client.room}</td>
            <td>${client.checkIn}</td>
            <td>${client.checkOut}</td>
        </tr>`;
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET"
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