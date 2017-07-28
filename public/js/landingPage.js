var langsReady = false;



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

function showInfo(msg){
    $(".main").prepend(""   +
            "<div class='alert alert-info'>" +
            "<strong>Info! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-info").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}

function submit(){
    $("#form-signup").submit();
}

function resendEmail(){
    $(".errorMsg").html("Loading...");
    $.ajax({
        url:"/resend-email",
        success: function(result){
            $(".errorMsg").hide();
            if(result.success){
                showInfo(result.msg);
            }
            else{
                showError(result.msg);
            }
        },
        error: function(err){
            $("#errorMsg").hide();
            showError(err);
        }
    });
}