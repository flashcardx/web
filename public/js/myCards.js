

function showError(msg){
    $(".container").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}



function deleteCard(id){
    $.ajax({
        url:"/card/" + id,
        type: "DELETE",
        success: result=>{
            removeCard(id);
        },
        error: err=>{
            showError(err);
        }
    });
}

function removeCard(id){
    $("#" + id).fadeOut(300, function(){ $(this).remove();});
    showSuccess("Card was deleted!");
}



function showSight(){
      $(".main-content").prepend(""   +
            "<div class='alert alert-deleted alert-success'>" +
            " Card deleted</div>");

     window.setTimeout(function() {
    $(".alert-deleted").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}