
function checkUndefined(value){
    if(value === undefined)
        return ""
    else
        return value;
}

function speak(obj, lang){
   var id = "#speak" + obj;
   $(id).articulate('setVoice','language',lang).articulate('rate', 0.9).articulate("speak");
}

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