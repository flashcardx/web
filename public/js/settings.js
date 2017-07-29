var userLang;

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

(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    }
})(jQuery);

function renderUserInfo(info){
    $("#user-name").text(info.name);
    $("#user-email").text(info.email);
    $("#profile-img").attr("title", info.name);
    console.log("info: " + JSON.stringify(info));
    if(!info.thumbnail || info.thumbnail == "undefined" || info.thumbnail == undefined)
        imgError("profile-img");
    else
        $("#profile-img").attr("src", info.thumbnail);
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



//THUMBNAIL IMAGE UPLOAD
var imgPreviewBackup;
function readURL(input) {
  const idPreview = "profile-img";
  if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                imgPreviewBackup = $("#"+idPreview +"-container").html(); 
                $("#"+idPreview).changeElementType("img");
                $('#' + idPreview).attr('src', this.src);
                showConfirmButtons();
            };
        };
        reader.readAsDataURL(input.files[0]);
  }
}

function showConfirmButtons(){
    $("#img-buttons").hide();
    $("#confirm-buttons").show();
}

function submitChangeImg(){
    $("#form-update-img").submit();
    $("#confirm-buttons").hide();
    $("#img-buttons").show();
}

function cancelChangeImg(){
    $("#confirm-buttons").hide();
    $("#img-buttons").show();
    $("#profile-img-container").html(imgPreviewBackup);
    $(".letterpic").letterpic({ fill: 'color' });
    $('#form-update-img').trigger("reset");
}


$(document).ready(function () {
    $('#form-update-img').on('submit', e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = new FormData($("#form-update-img")[0]);
        $.ajax({
            url :"/userImg",
            method: "post",
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: data=>{
                if(data.success == false){
                    showError(data.msg);
                    cancelChangeImg();
                }
                else
                    showSuccess("User image changed");
            },
            error: function (jXHR, textStatus, errorThrown) {
                cancelChangeImg
                console.error("error, textStatus: " + textStatus + ", error:"  + errorThrown);
                showError("Could not change user image");
            }
        });
    });
});

 function choseFile() {
      const idInput = "fileInput";
      $("#" + idInput).click();
   }

function deleteImg(){
     $.ajax({
            url :"/userImg",
            method: "delete",
            success: data=>{
                if(data.success == false){
                    showError(data.msg);
                }
                else{
                    $("#profile-img").attr("src", "http://");
                    imgError("profile-img");
                    showSuccess("Class image removed");
                    $('#form-update-img').trigger("reset");
                }
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.error("error, textStatus: " + textStatus + ", error:"  + errorThrown);
                showError("Could not delete user image");
            }
        });
} 