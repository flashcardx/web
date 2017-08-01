getClassStats();
getClassIntegrants(); // will fill isOwner and call RenderButton()

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


function getClassStats(){
        $.ajax({
            url: "/classStats/"+classname,
            success: result=>{
                if(result.success == false)
                    showError(result.msg);
                else{
                    fillStats(result.msg);
               }
            },
            error: err=>{
                console.error("Something went wrong when retrieving class data : " + JSON.stringify(err));
                showError("Something went wrong when retrieving class data :(");
            }
        });
 }

$('#email').bind("enterKey",function(e){
    $("#add-button").click();
});
$('#email').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

 function fillStats(stats){
    var owner = (stats.owner._id==userId)? "You" : stats.owner.name; 
    var cards = (stats.maxLimit - stats.cardsLeft) + "/" + stats.maxLimit; 
    var users = (stats.maxUsers - stats.usersLeft) + "/" + stats.maxUsers; 
    var type = (stats.isPrivate==false)? "Public": "Private";
    $("#st-owner").text(owner);
    $("#st-cards").text(cards);
    $("#st-users").text(users);
    $("#st-type").text(type);
    if(!stats.thumbnail || stats.thumbnail == "undefined" || stats.thumbnail == undefined)
        imgError("preview-img");
    else
        $("#preview-img").attr("src", stats.thumbnail);
 }

function getClassIntegrants(){
        $.ajax({
            url: "/classIntegrants/"+classname,
            success: result=>{
                if(result.success == false)
                    showError(result.msg);
                else{
                    fillIntegrants(result.msg);
               }
            },
            error: err=>{
                console.error("Something went wrong when retrieving class data : " + JSON.stringify(err));
                showError("Something went wrong when retrieving class data :(");
            }
        });
 }



 function fillIntegrants(integrants){
    var html = "";
    var button = "";
    var name;
    var isOwner;
    if(integrants.owner._id == userId){
        button = "Class admin can not leave the class";
        name = "You";
        isOwner = true;
    }
    else{
        name = integrants.owner.name;
        isOwner = false;
        button = "This is the class admin";
    }
    var url = (integrants.owner.thumbnail)? integrants.owner.thumbnail : "http://";
    html += "<tr>" +
                "<th scope='row'> <img id='img-"+integrants.owner._id+"' onerror=\"imgError('img-"+integrants.owner._id+"');\"  class='img-fluid my-thumbnail float-left letterpic' title='"+integrants.owner.name+"' src='"+url+"' alt='User thumbnail'> </th>"+
                                    "<td>"+name+"</td>" +
                                    "<td>"+button+"</td>"+
                                "</tr>";
    integrants.integrants.forEach(i=>{
        if(i._id == userId){
            name = "You";
            button = "<a href='/leaveClass/"+classname+"' class='btn btn-danger class-btn'>Leave</a>";
        }
        else{
            name = i.name;
            if(isOwner == true)
                button = "<button onClick=\"removeUser('"+i._id+"');\" class='btn btn-warning class-btn'>remove</button>";
            else 
                button = "";
        }
        html += "<tr id='user-"+i._id+"'>" +
                "<th scope='row'> <img id='img-"+i._id+"' onerror=\"imgError('img-"+i._id+"');\" class='img-fluid my-thumbnail float-left' title='"+i.name+"' src='"+i.thumbnail+"' alt='User thumbnail'> </th>"+
                                    "<td>"+name+"</td>" +
                                    "<td>"+button+"</td>"+
                                "</tr>";
        });
    $("#add-people").append(html);
    renderLastButton(isOwner);
}

function removeUser(id){
    var data = {
        leaverId: id,
        classname: classname
    };
    $.ajax({
            url: "/userFromClass",
            method:"delete",
            data: data,
            success: result=>{
                if(result.success == false)
                    showError(result.msg);
                else
                    deleteUserFromList(id);
            },
            error: err=>{
                console.error("Something went wrong when retrieving class data : " + JSON.stringify(err));
                showError("Something went wrong when retrieving class data :(");
            }
        });
}

function deleteUserFromList(id){
    $("#user-"+id).fadeOut();
    $("#user-"+id).remove();
    showSuccess("User removed from class");
}

function renderLastButton(isOwner){
    var button;
    if(isOwner == true){
            button = "<button data-toggle='modal' data-target='#delete-modal' class='btn btn-danger class-btn'>Delete class</button>"+
                  "<button type='button' data-toggle='tooltip' data-placement='right'"+
                            "title='Since you are the admin, you can not leave the class. You are the only one who can delete this class'"+ 
                            "class='fa fa-info margin5' aria-hidden='true'>"+
                    "</button>";
    }
    else{
            button = "<a href='/leaveClass/"+classname+"' class='btn btn-danger class-btn'>Leave</a>";          
    }
    $("#last-button").html(button);
}

function addPeople(){
        var email = $("#email").val();
        if(validateEmail(email) == false){
            showWarning("Please enter a valid email address");
            return;
        }
        $.ajax({
        url: "/addUserToClass",
        method: "post",
        data: {
            userEmail: email,
            classname: classname
        },
        success: result=>{
            console.log("add user got: " + JSON.stringify(result));
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("User added");
                renderUserAdded(result.msg);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when trying to add user to class : " + JSON.stringify(err));
            showError("Something went wrong when trying to add user to class :(");
        }
    });
}

function renderUserAdded(user){
    var html = "<tr id='user-"+user._id+"'>" +
                "<th scope='row'> <img id='img-"+user._id+"' onerror=\"imgError('img-"+user._id+"');\" class='img-fluid my-thumbnail float-left letterpic' title='"+user.name+"' src='"+user.thumbnail+"' alt='User thumbnail'> </th>"+
                                    "<td>"+user.name+"</td>" +
                                    "<td><button onClick=\"removeUser('"+user._id+"');\" class='btn btn-warning class-btn'>remove</button></td>"+
                                "</tr>";
    $("#add-people").append(html);
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}


//THUMBNAIL IMAGE UPLOAD
var imgPreviewBackup;
function readURL(input) {
  const idPreview = "preview-img";
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
    $("#preview-img-container").html(imgPreviewBackup);
    $(".letterpic").letterpic({ fill: 'color' });
    $('#form-update-img').trigger("reset");
}


$(document).ready(function () {
    $('#form-update-img').on('submit', e=>{
        e.preventDefault();
        e.stopImmediatePropagation();
        var form = new FormData($("#form-update-img")[0]);
        $.ajax({
            url :"/classImg/"+classname,
            method: "post",
            data: form,
            cache: false,
            contentType: false,
            processData: false,
            success: data=>{
                console.log("got back: " +JSON.stringify(data));
                if(data.success == false){
                    showError(data.msg);
                    cancelChangeImg();
                }
                else
                    showSuccess("Class image changed");
            },
            error: function (jXHR, textStatus, errorThrown) {
                cancelChangeImg
                console.error("error, textStatus: " + textStatus + ", error:"  + errorThrown);
                showError("Could not set class image");
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
            url :"/classImg/"+classname,
            method: "delete",
            success: data=>{
                console.log("got back: " +JSON.stringify(data));
                if(data.success == false){
                    showError(data.msg);
                }
                else{
                    $("#preview-img").attr("src", "http://");
                    imgError("preview-img");
                    showSuccess("Class image removed");
                    $('#form-update-img').trigger("reset");
                }
            },
            error: function (jXHR, textStatus, errorThrown) {
                console.error("error, textStatus: " + textStatus + ", error:"  + errorThrown);
                showError("Could not set class image");
            }
        });
} 


