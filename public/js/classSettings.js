getClassStats();
getClassIntegrants(); // will fill isOwner and call RenderButton()

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

 function fillStats(stats){
    var owner = (stats.owner._id==userId)? "You" : stats.owner.name; 
    var cards = (stats.maxLimit - stats.cardsLeft) + "/" + stats.maxLimit; 
    var users = (stats.maxUsers - stats.usersLeft) + "/" + stats.maxUsers; 
    var type = (stats.isPrivate==false)? "Public": "Private";
    $("#st-owner").text(owner);
    $("#st-cards").text(cards);
    $("#st-users").text(users);
    $("#st-type").text(type);
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
    console.log("fill integrants: " + JSON.stringify(integrants));
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
    html += "<tr>" +
                "<th scope='row'> <img class='img-fluid my-thumbnail float-left letterpic' title='"+integrants.owner.name+"' src='"+integrants.owner.thumbnail+"' alt='User thumbnail'> </th>"+
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
                "<th scope='row'> <img class='img-fluid my-thumbnail float-left letterpic' title='"+i.name+"' src='"+i.thumbnail+"' alt='User thumbnail'> </th>"+
                                    "<td>"+name+"</td>" +
                                    "<td>"+button+"</td>"+
                                "</tr>";
        });
    $("#add-people").append(html);
    $(".letterpic").letterpic({ fill: 'color' });
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
                            "class='fa fa-info' aria-hidden='true'>"+
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
        console.log("email: " + email);
        console.log("Classname: " + classname);
}

function renderUserAdded(user){
    console.log("user added: " + JSON.stringify(user));
    var html = "<tr id='user-"+user._id+"'>" +
                "<th scope='row'> <img class='img-fluid my-thumbnail float-left letterpic' title='"+user.name+"' src='"+user.thumbnail+"' alt='User thumbnail'> </th>"+
                                    "<td>"+user.name+"</td>" +
                                    "<td><button onClick=\"removeUser('"+user._id+"');\" class='btn btn-warning class-btn'>remove</button></td>"+
                                "</tr>";
    $("#add-people").append(html);
    $(".letterpic").letterpic({ fill: 'color' });
}



function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
