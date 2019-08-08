var API_URL = {
    UPDATE: 'http://localhost:8080/clients/'
};

window.EditClient = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const cnp = urlParams.get('cnp');
        const name = urlParams.get('name');
        const forename = urlParams.get('forename');
        const birthday = urlParams.get('birthday');
        const typeID = urlParams.get('typeID');
        const seriesID = urlParams.get('seriesID');
        const numberID = urlParams.get('numberID');
        const street = urlParams.get('street');
        const streetNumber = urlParams.get('streetNumber');
        console.info('name works', name);
        console.info('forename works', forename);
        console.info('birthday works', birthday);
        console.info('typeID works', typeID);
        console.info('seriesID works', seriesID);
        console.info('numberID works', numberID);
        console.info('cnp works', cnp);
        console.info('street works', street);
        console.info('street number works', streetNumber);

        EditClient.display(cnp, name, forename, birthday, typeID, numberID, seriesID, street, streetNumber);
        EditClient.getInfo();
       
    },

    display: function(cnp, name, forename, birthday, typeID, numberID, seriesID, street, streetNumber){
        console.info('cnp works', cnp);
        document.getElementById("cnp").value = cnp;
        document.getElementById("name").value = name;
        document.getElementById("forename").value = forename;
        document.getElementById("birthday").value = birthday;
        document.getElementById("typeID").value = typeID;
        document.getElementById("seriesID").value = seriesID;
        document.getElementById("numberID").value = numberID;
        document.getElementById("street").value = street;
        document.getElementById("streetNumber").value = streetNumber;
    },

    getInfo: function(){
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
                streetNumber: $('input[name=streetNumber]').val(),
            };

            console.info("we made it to here", client)
            EditClient.edit(client);
        });

    },

    edit: function(client) {
        console.log();
        console.info("mata", client)
        $.ajax({
            url: API_URL.UPDATE + document.getElementById("cnp").value,
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            data: JSON.stringify(client, null, 2),
            success: function() {
                console.info ('We made it'),
                alert('Edited client');
                window.open("existenting_client.html?cnp=" + document.getElementById("cnp").value, "_self");
              },
              error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (response) {
            if (response.success) {
                console.info('person', response);
            }
        });
    },

}
EditClient.load();
