var API_URL = {
    READ: 'http://localhost:8080/services/'
};

window.Activity = {

    load: function () {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        console.info('id works', id);
        $.ajax({
            url: API_URL.READ + id,
            method: "GET"
        }).done(function (activity) {
            console.info('done: activity', activity);

            
            Activity.display(activity);
        });
    },

    display: function(activity) {
        $('#name').html(activity.serviceName);
        $('#serviceDuration').html(activity.serviceDuration);
        $('#servicePrice').html(activity.servicePrice);
    },

    send: function(){
        $("#edit").click( function() {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            console.info("we are here")
            var url = "edit_activity.html?name=" + document.getElementById("name").innerHTML  + "&servicePrice=" + document.getElementById("servicePrice").innerHTML + "&serviceDuration=" + document.getElementById("serviceDuration").innerHTML + "&id=" + id;
            console.info(url);
            window.open(url, "_self");
        });
    }
}

console.info('loading activity');
Activity.load();
Activity.send();
console.info('bla bla bla');