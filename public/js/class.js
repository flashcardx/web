getMyClasses();
getDiscoverClasses();
var xhr;

$('#search-box').bind("enterKey",function(e){
   searchClass();
});
$('#search-box').keyup(function(e){
    if(e.keyCode == 13)
    {
        $(this).trigger("enterKey");
    }
});

function getMyClasses(){
    try { xhr.abort(); } catch(e){}
        xhr = $.ajax({
        url: "/classes",
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                appendMyClasses(result.msg, result.userId);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when retrieving your classes: " + JSON.stringify(err));
            showError("Something went wrong when retrieving your classes :(");
        }
    });
}

function appendMyClasses(classes, userId){
    if(classes.length == 0){
            $("#classes-content").html("You do not have classes(in the current language). Create or enroll to classes for sharing cards and connecting with your classmates!");  
            return;
    }
    classes.forEach((c, i)=>{
        var html = "";
        var type = "Public";
        if(c.isPrivate == "true")
            type = "Private";
        if(i == 0) 
            html +=  " <div class='class'>";
        else
            html += " <div class='class top-buffer'>";
            html += "<div class='row'>"+
                          "<div class='col-xs-12 col-md-2'>"+
                           "<a target='_blank' href='assets/img/default.png'>"+
                              "<img class='img-fluid my-thumbnail float-left letterpic' title='" + c.name + "'src='" + c.thumbnail + "' alt='Default image'>"+
                            "</a>"+
                          "</div>"+
                          "<div class='col-md-10'>" +
                                "<div class='row'>" +
                                    "<div class='col'><h4>"+  c.name +"</h4></div>"+
                                    "<div class='col'>Type: "+ type +"</div>"+
                                    "<div class='col'>Admin: " + c.owner.name +"</div>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<div class='col-12'>"+ 
                                        c.description  +
                                        "</div>"+
                                "</div>"+
                          "</div>"+
                "</div>"+
                      "<div class='row'>" +
                          "<div class='col'>  People: " + (c.maxUsers - c.usersLeft) + "/" + c.maxUsers + "</div>"+
                           "<div class='col'> Cards: "+ (c.maxLimit - c.cardsLeft) + "/" + c.maxLimit + "</div>"+
                           "<div class='col-md-4 col-xs-12'>"    +
                           "<a href='/classSettings?q="+c.name+"' class='col btn btn-warning class-btn'>Settings</a>" +
                           " <a class='col btn btn-success background-blue class-btn'>Enter</a>"  + //do not delete the space at the beginning
                           "</div>"     +
                      "</div>"+  
                "</div>";
       $("#classes-content").append(html); 
       $(".letterpic").letterpic({ fill: 'color' });        
    });
}

var xhr3;
function searchClass(){
    var q = $("#search-box").val();
    q = validateURL(q, "search parameter has invalid characters!");
    if(!q)
        return;
    var url = "/searchClass/"+ q;
    console.log("url: " + url);
    try { xhr3.abort(); } catch(e){}
        xhr3 = $.ajax({
        url: url,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                appendSearchClass(result.msg, result.userId);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when searching class : " + JSON.stringify(err));
            showError("Something went wrong when searching the class :(");
        }
    });
}

function appendSearchClass(Class, userId){
        if(!Class){
             $("#search-results").html("This class does not exist (for the current languaje) yet!");
             return;      
        }
        var html = "";
        var lastButton;
        var userBelongs = checkUserIsInClass(Class, userId);
        if(userBelongs == false)
            lastButton = "<button onClick=\"join('"+ Class.name + "', 'search');\" class='col btn btn-success class-btn'>Join</button>";
        else
            lastButton = "<a href='/classSettings?q="+Class.name+"' class='col btn btn-warning class-btn'>Settings</a> <a class='col btn btn-info background-blue class-btn'>Enter</a>";
        var type = "Public";
        if(Class.isPrivate == "true")
            type = "Private";
        html += " <div class='class top-buffer'>";
        html += "<div class='row'>"+
                          "<div class='col-md-2 col-xs-12'>"+
                           "<a target='_blank' href='assets/img/default.png'>"+
                              "<img class='img-fluid my-thumbnail float-left letterpic' title='" + Class.name + "'src='" + Class.thumbnail + "' alt='Default image'>"+
                            "</a>"+
                          "</div>"+
                          "<div class='col-10'>" +
                                "<div class='row'>" +
                                    "<div class='col'><h4>"+  Class.name +"</h4></div>"+
                                    "<div class='col'>Type: "+ type +"</div>"+
                                    "<div class='col'>Admin: " + Class.owner.name +"</div>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<div class='col-md-4 col-xs-12'>"+ 
                                        Class.description  +
                                        "</div>"+
                                "</div>"+
                          "</div>"+
                "</div>"+
                      "<div class='row'>" +
                          "<div class='col'>  People: " + (Class.maxUsers - (Class.integrants.length + 1)) + "/" + Class.maxUsers + "</div>"+
                           "<div class='col'> Cards: "+ (Class.maxLimit - Class.cardsLeft) + "/" + Class.maxLimit + "</div>"+
                           "<div class='col-md-4 col-xs-12'>"    +
                           lastButton  +
                           "</div>"     +
                      "</div>"+  
                "</div>";
       $("#search-results").html(html);
       $(".letterpic").letterpic({ fill: 'color' });       
}

function checkUserIsInClass(Class, userId){
    if(Class.owner.id == userId)
        return true;
    var r =  false; 
    Class.integrants.forEach(v=>{
         if(v.id == userId){
            r = true;
         }
    });
    return r;
}

function getDiscoverClasses(){
        $.ajax({
        url: "/recommendClasses",
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                appendDiscoverClasses(result.msg, result.userId);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when retrieving your classes: " + JSON.stringify(err));
            showError("Something went wrong when retrieving your classes :(");
        }
    });
}

function appendDiscoverClasses(classes, userId){
    console.log("discover classes: " + JSON.stringify(classes));
    if(classes.length == 0){
        $("#discover-classes-content").html("Nothing at the moment(for the current language)! :(");   
        return;
    }     

    classes.forEach((c, i)=>{
        var html = "";
        var type = "Public";
        if(c.isPrivate == "true")
            type = "Private";
        if(i == 0) 
            html +=  " <div id='discover-class-"+c.name+"' class='class'>";
        else
            html += " <div id='discover-class-"+c.name+"' class='class top-buffer'>";
        html += " <div class='row'>"+
                          "<div class='col-md-2 col-xs-12'>"+
                           "<a target='_blank' href='assets/img/default.png'>"+
                              "<img class='img-fluid my-thumbnail float-left letterpic' title='" + c.name + "' src='" + c.thumbnail + "' alt='Default image'>"+
                            "</a>"+
                          "</div>"+
                          "<div class='col-10'>" +
                                "<div class='row'>" +
                                    "<div class='col'><h4>"+  c.name +"</h4></div>"+
                                    "<div class='col'>Type: "+ type +"</div>"+
                                    "<div class='col'>Admin: " + c.owner.name +"</div>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<div class='col-12'>"+ 
                                        c.description  +
                                        "</div>"+
                                "</div>"+
                          "</div>"+
                "</div>"+
                "<div class='row'>" +
                          "<div class='col'>  People: " + (c.maxUsers - c.usersLeft) + "/" + c.maxUsers + "</div>"+
                           "<div class='col'> Cards: "+ (c.maxLimit - c.cardsLeft) + "/" + c.maxLimit + "</div>"+
                            "<div class='col-md-4 col-xs-12'>"    +
                                "<a onClick=\"join('"+ c.name + "', 'discover');\" class='col btn btn-success class-btn'>Join</a>"+
                           "</div>"+
                      "</div>"+  
                "</div>";
        $("#discover-classes-content").append(html);
    });
     $(".letterpic").letterpic({ fill: 'color' });    
}


function join(classname, src){
    if(src != "search" && src != "discover")
        throw new Exception("src invalid, got: " + src);
    console.log("clasnname: " + classname + " , src: " + src);
    joinClass(classname, result=>{
        console.log("result: " + JSON.stringify(result));
        showSuccess("You are now an important part of the class ;)!");
        $("#search-results").html("");
        $("#classes-content").html("");
        $("#discover-class-"+classname).hide();
        getMyClasses();
    });
}


function joinClass(classname, callback){
    $.ajax({
        url:"/joinClass/"+classname,
        success: result=>{
            if(result.success == false)
                showError("Something went wrong when adding you to the class, refresh the page and try again!");
            else{
                callback(result);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when searching class : " + JSON.stringify(err));
            showError("Something went wrong when searching the class :(");
        }
    });
};