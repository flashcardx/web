




function updateCard(cardId){
    var nameElement = $("#update-" + cardId).find(".card-title");
    var descriptionElement = $("#update-" + cardId).find(".card-description");
    var updateButtonElement = $("#update-button-"+cardId);
    var buttonsElement = $("#buttons-"+cardId);
    var textElement = nameElement.parent();
    
    var backupText = textElement.html();
    var backUpButtons = buttonsElement.html();
    var oldName = nameElement.text();
    var oldDescription = descriptionElement.text();
    nameElement.replaceWith("<input value='"+oldName+"' name='name' type='text' class='form-control card-title' id='update-title-"+cardId+"' placeholder='Enter new name'>");
    descriptionElement.replaceWith("<textarea rows='5' name='description' id='update-description-"+cardId+"' type='text' class='form-control' placeholder='A description of the word'>"+oldDescription+"</textarea>");
    loadUpdateButtons(cardId, backupText, backUpButtons);
}

function loadUpdateButtons(cardId, backupText, backUpButtons){
    var buttonsElement = $("#buttons-"+cardId);
    buttonsElement.html("<div class='row'>"+
                                    "<a 'role='button' id='confirm-update-"+cardId+"' class='btn nounderline btn-success my-2 my-sm-1'> <i class='fa fa-check fa-fw' aria-hidden='true'></i></a>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<a role='button' id='cancel-"+cardId+"' class='btn nounderline btn-danger delete-btn my-2 my-sm-1'> <i class='fa fa-times fa-fw' aria-hidden='true'></i></a>"+
                                "</div>");
    $("#cancel-"+cardId).click(()=>{
        cancel(cardId, backupText, backUpButtons);
    });

    $("#confirm-update-"+cardId).click(()=>{
        confirmUpdate(cardId, backupText, backUpButtons);
    });

}

function confirmUpdate(cardId, backupText, backUpButtons){
    var name = $("#update-title-"+cardId).val();
    var description = $("#update-description-"+cardId).val();
    //ajax call calls updateDone on success
     $.ajax({
            method: "post",
            data:{
                name: name,
                description: description
                },
            url:"/updateCard/" + cardId,
            success: result=>{
                if(!result.success)
                    showError(result.msg);
                else{
                    updateDone(cardId, backupText, backUpButtons, name, description);
                }
            },
            error: err=>{
                    showError(err);
            }
        });
}

function updateDone(cardId, backupText, backUpButtons, name, description){
     var buttonsElement = $("#buttons-"+cardId);
     var textElement =  $("#update-" + cardId).find(".card-title").parent();
     textElement.html(backupText);
     $("#speak"+cardId+" span").text(name);
     $("#description-"+cardId).text(description);
     buttonsElement.html(backUpButtons);
     showSuccess("Card was updated successfully!");
}


function cancel(cardId, backupText, backUpButtons){
    var buttonsElement = $("#buttons-"+cardId);
    var textElement =  $("#update-" + cardId).find(".card-title").parent();
    textElement.html(backupText);
    buttonsElement.html(backUpButtons);
}



