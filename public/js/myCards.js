

$(".delete-btn").click(function(){
    var id =  $(this).closest('.card').attr('id');
    deleteCard(id);
});



function deleteCard(id){
    $.ajax({
        url:"/card/" + id,
        type: "DELETE",
        success: result=>{
            removeCard(id);
            showSight();
        },
        error: err=>{
            $(".main-content").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + err + "</div>");
        }
    });
}

function removeCard(id){
    $("#" + id).remove();
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