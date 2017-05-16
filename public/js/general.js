
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
