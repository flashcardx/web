
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
       $.notify({
            title: "Success,",
            icon:"fa fa-thumbs-up",
            message: msg
            },
            {
                type: 'success'
            }
            , {
	            newest_on_top: true
            }
        );
}

function showError(msg){
        $.notify({
            title: "Error,",
            icon:"fa fa-exclamation-triangle",
            message: msg
            },
            {
                type: 'danger'
            }
            , {
	            newest_on_top: true
            }
        );
}