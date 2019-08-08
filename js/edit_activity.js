var API_URL = {
    UPDATE: 'http://localhost:8080/services/'
};

window.EditActivity = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const name = urlParams.get('name');
        const servicePrice = urlParams.get('servicePrice');
        const serviceDuration = urlParams.get('serviceDuration');
        console.info('serviceName works', name);
        console.info('servicePrice works', servicePrice);
        console.info('serviceDuration works', serviceDuration);

        EditActivity.display(name, servicePrice, serviceDuration);
        EditActivity.getInfo();
       
    },

    display: function(name, servicePrice, serviceDuration){
        console.info('serviceName works', name);
        document.getElementById("name").value = name;
        document.getElementById("servicePrice").value = servicePrice;
        document.getElementById("serviceDuration").value = serviceDuration;
    },

    getInfo: function(){
        $(".add-form").submit(function() {
            const activity = {
                servicePrice: $('input[name=servicePrice]').val(),
                serviceDuration: $('input[name=serviceDuration]').val(),
            };

            console.info("we made it to here", activity)
            EditActivity.edit(activity);
        });

    },

    edit: function(activity) {
        console.log();
        console.info("mata", activity)
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        $.ajax({
            url: API_URL.UPDATE + document.getElementById("name").value,
            headers: {
                "Content-Type": "application/json"
            },
            method: "PUT",
            data: JSON.stringify(activity, null, 2),
            success: function() {
                console.info ('We made it'),
                alert('Edited activity');
                window.open("activity.html?id=" + id, "_self");
              },
              error: function(xhr, status, error){
                console.info("something is wrong", xhr);
                alert('Request Status: ' + xhr.status + ' Status Text: ' + xhr.responseJSON.message);
            } 
        }).done(function (response) {
            if (response.success) {
                console.info('activity', response);
            }
        });
    },

}
EditActivity.load();
