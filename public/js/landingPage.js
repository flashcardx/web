var langsReady = false;

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

function fillLangs(){
    if(langsReady)
        return;
      $.ajax({
        url:"/getLangs",
        success: result=>{
                 fillLangsSelect(result);
        },
        error: err=>{
                showError(err);
        }
    });
}

function fillLangsSelect(langs){
    var element = $("#select-lang");
    langs.forEach(l=>{
        var html = "";
        if(l.code === "en")
            html += "<option selected='selected' value='"+l.code+"'>"+l.name+"</option>";
        else
            html += "<option value='"+l.code+"'>"+l.name+"</option>";
        element.append(html);
    });
    langsReady = true;
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

function submit(){
    $("#form-signup").submit();
}