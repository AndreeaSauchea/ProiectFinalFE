var API_URL = {
    CREATE: 'http://localhost:8080/clients'
};

window.NewClient = {

    load: function(){
        $(".add-form").submit(function() {
            const client = {
                forename: $('input[name=forename]').val(),
                name: $('input[name=name]').val(),
                birthday: $('input[name=birthday]').val(),
                cnp: $('input[name=cnp]').val(),
                typeID: $('input[name=typeID]').val(),
                seriesID: $('input[name=seriesID]').val(),
                numberID: $('input[name=numberID]').val(),
                street: $('input[name=street]').val(),
                streetNumber: $('input[name=streetNumber]').val()
            };

                NewClient.save(client);

        });
    },

    save: function(client) {
        console.log(client);
        $.ajax({
            url: API_URL.CREATE,
            headers: {

                "Content-Type": "application/json"
            },
            method: "POST",
            data: JSON.stringify(client, null, 2),
            success: function() {
                console.info ('We made it'),
                alert('New client was created');
                location.reload(true);
              }
        }).done(function (response) {
            if (response.success) {
                console.info('person', response);
            }
        });
    },


}
console.info('loading persons');
NewClient.load();