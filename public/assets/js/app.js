//Scrape new articles
$(document).on("click", "#scrape", function () {
    $.ajax({
        method: "GET",
        url: "/scrape"
    }).then(function (data) {
        window.location.href = "/";
    })
});

//Remove Comment
$(document).on("click", ".delete", function () {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "DELETE",
        url: "/comments/" + thisId
    }).then(function (data) {
        location.reload();
    })
});

//Post new comment
$(document).on("click", ".comment", function () {
    var thisId = $(this).attr("data-id");
    var newComment = {
        comment: $("#articleComment").val().trim()
    }
    $.ajax({
        method: "POST",
        url: "/articles/" + thisId,
        data: newComment
    }).then(function (data) {
        $("#articleComment").empty();
        location.reload();
    })
}); 

//DELETE all documents
$(document).on("click", "#trash", function () {
    $.ajax({
        method: "DELETE",
        url: "/"
    }).then(function (data) {
        window.location.href = "/";
    })
});