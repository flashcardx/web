var elem = document.querySelector('.js-switch');
var init = new Switchery(elem, { size: 'small'});
var on = false;
var autocompleteLastValue;

$.ajax({
        url: "/userPreferences",
        success: result=>{
            console.log("user preferences: " + JSON.stringify(result));
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
      if(preferences.autoComplete == false)
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
    $('#title').donetyping(function(){
            autocomplete();
    });
}

function autocomplete(){
    if(on == false)
        return;
    var newVal = $("#title").val();
    if(newVal == autocompleteLastValue)
        return;
    autocompleteLastValue = newVal; 
    defineAndFill(autocompleteLastValue);
}





function desactivate(){
    on = false;
    $("#title").off('blur');
}

function defineAndFill(word){
    if(!word || word===" ")
        return;
    $.ajax({
        url: "/define/" + word,
        success: result=>{
            if(!result.success){
                $(".js-switch").click();
            }
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


//
// $('#element').donetyping(callback[, timeout=1000])
// Fires callback when a user has finished typing. This is determined by the time elapsed
// since the last keystroke and timeout parameter or the blur event--whichever comes first.
//   @callback: function to be called when even triggers
//   @timeout:  (default=1000) timeout, in ms, to to wait before triggering event if not
//              caused by blur.
// Requires jQuery 1.7+
//
(function($){
    $.fn.extend({
        donetyping: function(callback,timeout){
            timeout = timeout || 1e3; // 1 second default timeout
            var timeoutReference,
                doneTyping = function(el){
                    if (!timeoutReference) return;
                    timeoutReference = null;
                    callback.call(el);
                };
            return this.each(function(i,el){
                var $el = $(el);
                // Chrome Fix (Use keyup over keypress to detect backspace)
                // thank you @palerdot
                $el.is(':input') && $el.on('keyup keypress paste',function(e){
                    // This catches the backspace button in chrome, but also prevents
                    // the event from triggering too preemptively. Without this line,
                    // using tab/shift+tab will make the focused element fire the callback.
                    if (e.type=='keyup' && e.keyCode!=8) return;
                    
                    // Check if timeout has been set. If it has, "reset" the clock and
                    // start over again.
                    if (timeoutReference) clearTimeout(timeoutReference);
                    timeoutReference = setTimeout(function(){
                        // if we made it here, our timeout has elapsed. Fire the
                        // callback
                        doneTyping(el);
                    }, timeout);
                }).on('blur',function(){
                    // If we can, fire the event since we're leaving the field
                    doneTyping(el);
                });
            });
        }
    });
})(jQuery);
