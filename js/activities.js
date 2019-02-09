var API_URL = {
    READ: 'http://localhost:8080/services'
};

window.Activities = {
    getRow: function(activity) {
        return `<div class="col-md-1"></div>
        <div class="col-md-1">
            <a class="btn btn-default btn-lg" role="button" href="activity.html?id=${activity.id}">${activity.serviceName}</a>
        </div>`;
    },

    load: function () {
        $.ajax({
            url: API_URL.READ,
            method: "GET"
        }).done(function (activities) {
            console.info('done: activities', activities);

            
            Activities.display(activities);
        });
    },

    display: function(activities) {
        var rows = '';

        activities.forEach(activity => rows += Activities.getRow(activity));
        $('#activities').html(rows);
    }
};

console.info('loading activity');
Activities.load();