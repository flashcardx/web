reloadCategories();

function reloadCategories(){
    $('#category-select').html("<option selected='selected' value='*'>All categories</option>"+
                                  "<option value=''>No category</option>");
    loadCategories();
}

function loadCategories(){
    $.ajax({
        url:"/categories",
        success: result=>{
            if(result.success === false)
                showError(result.msg);
            else
               fillCategoriesFilter(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
}

$('#category-select').on('change', function() {
        reloadForCategory(this.value);
})


 function fillCategoriesFilter(categories){
     categories.forEach(c=>{
         $('#category-select').append($('<option>', {
                value: c,
                text: c
            }));
     })
 }

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