

function deleteCard(id){
    console.log("delete card");
    $.ajax({
        url:"/classCard/" + classname+"/"+id,
        type: "DELETE",
        success: result=>{
            removeCard(id);
        },
        error: err=>{
            showError(err);
        }
    });
}

function deleteCardFeed(id, classname){
    console.log("delete card");
    $.ajax({
        url:"/classCard/" + classname+"/"+id,
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
