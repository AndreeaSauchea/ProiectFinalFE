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
        $('#duration').html(activity.serviceDuration);
        $('#price').html(activity.servicePrice);
    }
}

console.info('loading activity');
Activity.load();