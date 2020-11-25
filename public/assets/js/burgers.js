$(function() {
    // Devour button code for each burger on the menu
    $(".devour").on("click", function(event) {
        const id = $(this).data("id");
        const update = { devoured: true };

        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: update
        }).then( function() {
            location.reload();
        });
    })

    // Submit button code for new burger form
    $(".create").on("submit", function(event) {
        event.preventDefault();

        const newBurger = {
            burger_name: $("#burger").val().trim(),
            devoured: false
        }

        $.ajax(".api/burgers", {
            type: "POST",
            data: newBurger
        }).then( function() {
            location.reload();
        });
    })
});