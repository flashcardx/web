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

