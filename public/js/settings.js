var userLang;

$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

  $.ajax({
        url:"/getUserLang",
        success: result=>{
            if(result.success === false)
                showError(result.msg);
            else{
                saveUserLang(result.msg);
                loadLangs();
            }
        },
        error: err=>{
                showError(err);
        }
    });

  $.ajax({
        url:"/getUserInfo",
        success: result=>{
            if(result.success === false)
                showError(result.msg);
            else{
                renderUserInfo(result.msg);
            }
        },
        error: err=>{
                showError(err);
        }
    });

function renderUserInfo(info){
    $("#user-name").text(info.name);
    $("#user-email").text(info.email);
}




$(document).ready(()=>{
    var plan = (isPremium === true)?"Premium": "Basic";
    $("#user-plan").text(plan);
});



function loadLangs(){
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

function saveUserLang(lang){
    userLang = lang;
}

function fillLangsSelect(langs){
    var element = $("#select-lang");
    langs.forEach(l=>{
        var html = "";
        if(l.code === userLang)
            html += "<option selected='selected' value='"+l.code+"'>"+l.name+"</option>";
        else
            html += "<option value='"+l.code+"'>"+l.name+"</option>";
        element.append(html);
    });
}