var lastCardId = "";
var idsUpdated = []; // used for avoid listing updated cards again(whit older first filter)

function updateCard(cardId){
    var nameElement = $("#update-" + cardId).find(".card-title");
    var descriptionElement = $("#update-" + cardId).find(".card-description");
    var updateButtonElement = $("#update-button-"+cardId);
    var buttonsElement = $("#buttons-"+cardId);
    var textElement = nameElement.parent();
    var timeElement = textElement.children(".card-time");

    var backupText = textElement.html();
    var backUpButtons = buttonsElement.html();
    var oldName = nameElement.text();
    var oldDescription = descriptionElement.html(descriptionElement.attr("data-rawtext").replace(new RegExp("<br>", 'g'), "\n")).text().replace(new RegExp("(\\.\\.\\.)|(\u200CShow more >)|(\u200CShow less)", 'g'), "");
    nameElement.replaceWith("<input value='"+oldName+"' name='name' type='text' class='form-control card-title margin-title-update' id='update-title-"+cardId+"' placeholder='Enter new name'>");
    showMoreDestroyElement(descriptionElement);
    descriptionElement.replaceWith("<textarea rows='5' name='description' id='update-description-"+cardId+"' type='text' class='form-control' placeholder='A description of the word'>"+oldDescription+"</textarea>");
    var category = textElement.attr("data-category");
    var selectHtml = setupSelect(cardId, category);
    timeElement.hide();
    textElement.append(selectHtml);
    fillWithCategories(cardId, category);
    loadUpdateButtons(cardId, backupText, backUpButtons);
}

function setupSelect(cardId, category){
    var html = "<div class='input-group'>"+
                        "<select name='category' class='category margin-top form-control' id='select-category-"+cardId+"'>";
    if(category){
        html += "<option selected='selected' value='"+category+"'>"+category+"</option>" + 
                "<option value=''>No category</option>";
    }
    else
        html += "<option selected='selected' value=''>No category</option>"; 
    html += "</select>"+
            "<button onClick=\"loadLastCardId(\'"+cardId+"\');\" role='button' class='margin-top fix-height left-margin btn btn-warning' type='button' data-toggle='modal' data-target='#new-category-modal'>New category</button>"+
            "</div>";
    return html;
}

function loadLastCardId(cardId){
    lastCardId = cardId;
}

function fillWithCategories(cardId, category){
     $.ajax({
        url:"/categories",
        success: result=>{
            if(result.success === false)
                showError(result.msg);
            else
               fillCategories(cardId, category, result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
}

function fillCategories(cardId, defaultCategory, categories){
    var selectElement = $("#select-category-"+cardId);
     categories.forEach(c=>{
         if(c.name !== defaultCategory)
            selectElement.append($('<option>', {
                    value: c.name,
                    text: c.name
                }));
     })
 }

function loadUpdateButtons(cardId, backupText, backUpButtons){
    var buttonsElement = $("#buttons-"+cardId);
    buttonsElement.html("<div class='row'>"+
                          "<div class='col-md-12'>"+
                            "<a 'role='button' id='confirm-update-"+cardId+"' class='round btn nounderline btn-success my-2 my-sm-1 ev-mr-10'> <i class='fa fa-check fa-fw' aria-hidden='true'></i></a>"+
                            "<a role='button' id='cancel-"+cardId+"' class='round btn nounderline btn-danger delete-btn my-2 my-sm-1'> <i class='fa fa-times fa-fw' aria-hidden='true'></i></a>"+
                          "</div>"+ 
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
    var category = $("#select-category-"+cardId).val();
     $.ajax({
            method: "post",
            data:{
                name: name,
                description: description,
                category: category
                },
            url:"/updateCard/" + cardId,
            success: result=>{
                if(!result.success)
                    showError(result.msg);
                else{
                    updateDone(cardId, backupText, backUpButtons, name, description, category);
                }
            },
            error: err=>{
                    showError(err);
            }
        });
}

function updateDone(cardId, backupText, backUpButtons, name, description, category){
     idsUpdated.push(cardId);
     var textElement =  $("#update-" + cardId).find(".card-title").parent();
     var oldCategory = textElement.attr("data-category");
     if(oldCategory !== category){
        reloadCards();
        reloadCategories();
        return;
     }
     var buttonsElement = $("#buttons-"+cardId);
     textElement.html(backupText);
     $("#speak"+cardId+" span").text(name);
     $("#description-"+cardId).html(description.replace(/(\r\n|\n|\r)/g,"<br>"));
     showMoreRender("#description-"+cardId);
     buttonsElement.html(backUpButtons);
     textElement.attr("data-category", category);
     updateTime(cardId);
     showSuccess("Card was updated successfully!");
}

function updateTime(cardId){
    var time = "Updated "+ timeSince(new Date()) +" ago. ";
    $("#update-time-"+cardId).text(time);
}


function cancel(cardId, backupText, backUpButtons){
    var buttonsElement = $("#buttons-"+cardId);
    var textElement =  $("#update-" + cardId).find(".card-title").parent();
    textElement.html(backupText);
    buttonsElement.html(backUpButtons);
}



 function newCategory(){
     var category = $('#new-category').val();
     if(!category)
        return;
      $('#select-category-'+lastCardId).append($('<option>', {
                value: category,
                text: category,
                selected: "selected"
            }));
     showSuccess("Your new category has been added to the list!");
 }

