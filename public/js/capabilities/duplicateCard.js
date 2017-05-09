function duplicateCard(id){
        $.ajax({
        url: "/duplicateCard" + "/" + id,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                showSuccess(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
};

function showSuccess(msg){
     $(".main-content").prepend(""   +
            "<div class='alert alert-side alert-success'>" +
            msg+"</div>");

     window.setTimeout(function() {
    $(".alert-side").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}


function showError(msg){
    $(".main-content").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}