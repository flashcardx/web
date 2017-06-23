

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
            $(".main-content").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + err + "</div>");
        }
    });
}

function removeCard(id){
    $("#"+id).closest(".card").fadeOut(300, function(){ $(this).remove();});
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