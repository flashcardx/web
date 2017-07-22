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


var xhr;
$('#title').donetyping(function(){
    if(!this.value)
        return;
    var v = validateURL(this.value, "search parameter has invalid characters!");
    try { xhr.abort(); } catch(e){}
        xhr = $.ajax({
        url: "/searchClass/" + v,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                renderValidationResult(result.msg);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when searching class : " + JSON.stringify(err));
            showError("Something went wrong when searching the class :(");
        }
    });
});

function renderValidationResult(r){
    console.log("r:" + r);
    $("#classname-group").removeClass("has-success");
    $("#classname-group").removeClass("has-danger");
    if(!r){
        $("#classname-group").addClass("has-success");
        $("#classname-feedback").text("This classname is available");
    }
    else{
        $("#classname-group").addClass("has-danger");
        $("#classname-feedback").text("This classname already exist, try another one!");
    }
}

  $(".letterpic").letterpic({ fill: 'color' });   