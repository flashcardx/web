var elem = document.querySelector('.js-switch');
var init = new Switchery(elem, { size: 'small'});
var on = false;

$.ajax({
        url: "/userPreferences",
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                start(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });

function start(preferences){
      if(preferences.autoComplete === false)
            $(".js-switch").click();
      else
        activate();
      $(".js-switch").on("change", toggleAutocomplete);
}

function toggleAutocomplete(){
    $.ajax({
        url: "/toggleAutocomplete",
        success: result=>{
            if(result.success === false){
                showError(result.msg);
                init.disable();
                desactivate();
            }
            else
                changeMode();
        },
        error: err=>{
                showError(err);
        }
    });
}



function changeMode(){
    if(on === true)
        desactivate();
    else
        activate();
}

function activate(){
    on = true;
    $("#title").blur(function(){
        defineAndFill($("#title").val());
    });
}


function desactivate(){
    on = false;
    $("#title").off('blur');
}

function defineAndFill(word){
    $.ajax({
        url: "/define/" + word,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else{
                var text = result.msg;
                fillDescription(text);
            }
        },
        error: err=>{
                showError(err);
        }
    });
}

function fillDescription(text){
    $("#description").val(text);
}