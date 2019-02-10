window.Client = {

    load: function(){
        $("#btn").click( function() {
            console.info("we are here")
            var url = "existenting_client.html?cnp=" + $("#cnp").val();
            console.info("we might have done sth wit cnp", $("#cnp").val())
            window.open(url, "_self");
        });
    }

};
console.info("I am here");
Client.load();
console.info("Now I am here")




