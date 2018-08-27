
$(function () {  // everything has to be in the anonymous function. WHY?

    $("#submit").on("click", function(event) {
        event.preventDefault();

        var newBurger = {
            burger_name: $("#burger_name").val().trim(),
            devoured: 0
        }
        // console.log(newBurger);

        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("created a new burger");
                // Reload the page to get the updated list
				location.reload();
            }
        )
    });

    $(".devour").on("click", function() {
        var id = $(this).data('id');
        // console.log(id);
        var newDevour = ($(this).data('devoured')) ? false : true;
        // console.log(newDevour);
        var newStatus = {
			devoured: newDevour
        };
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newStatus
        }).then(
            function() {
                console.log("changed state to", newStatus);
                // Reload the page to get the updated list
				location.reload();
            }
        );
    });

    $(".delete").on("click", function() {
        var id = $(this).data('id');
        $.ajax("/api/burgers/" + id, {
            type: "DELETE"
        }).then(
            function() {
                console.log("burger deleted");
                location.reload();
            }
        )
    })
});
