$('#email').bind("enterKey",function(e){
        addPeople();
});

$('#email').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

console.log("classname: " + classname);

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
        console.log("email: " + email);
        console.log("Classname: " + classname);
}
function renderUserAdded(user){ 
    console.log("Will render: " + JSON.stringify(user));
    var html = "  <tr id='user-"+user._id+"' >"+
                    "<th scope='row'> <img class='img-fluid my-thumbnail float-left letterpic' title='" + user.name + "' src='"+user.thumbnail+"' alt='Default image'> </th>"+
                                    "<td>"+user.name+"</td>"+
                                    "<td><button onClick=\"removeUser('"+user._id+"');\" class='btn btn-warning class-btn'>Remove</button></td>"+
                                "</tr>"+
                                "<tr>";
    $("#nopeople").hide();
    $("#add-people").append(html);
    $(".letterpic").letterpic({ fill: 'color' });    
}

function removeUser(userId){
    var containerId = "user-" + userId;
    console.log("classname : " + classname);
      $.ajax({
        url: "/userFromClass",
        method: "delete",
        data: {
            leaverId: userId,
            classname: classname
        },
        success: result=>{
            console.log("add user got: " + JSON.stringify(result));
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("User removed");
                $("#"+containerId).fadeOut();
                $("#"+containerId).remove();
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when trying to remove user from class : " + JSON.stringify(err));
            showError("Something went wrong when trying to remove user from class :(");
        }
    });
}


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

