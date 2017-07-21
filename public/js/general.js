$(function () {
    $('[data-tooltip="tooltip"]').tooltip({
        trigger: 'hover'
    });
});


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

function showWarning(msg){
       $.notify({
            title: "Warning,",
            icon:"fa fa-exclamation-triangle",
            message: msg
            },
            {
                type: 'warning'
            }
            , {
	            newest_on_top: true
            }
        );
}

function validateURL(q, msg){
    if(!q || q == " " || q == "."){
        showWarning(msg);
        return null; 
    }
    if(q.includes("/") == true){
        showWarning(msg);
        return null;
    }

    return q;
}