$(document).ready(()=>{
    getDiscoverClasses();
});

function getDiscoverClasses(){
        $.ajax({
        url: "/recommendClasses",
        success: result=>{
            console.log("got classes: " + JSON.stringify(result));
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
            html +=  " <div id='discover-class-"+c._id+"' class='class'>";
        else
            html += " <div id='discover-class-"+c._id+"' class='class top-buffer'>";
        html += " <div class='row'>"+
                          "<div class='col-md-2 col-xs-12'>"+
                           "<a target='_blank' href='assets/img/default.png'>"+
                              "<img id='"+c._id+"' onerror=\"imgError('"+c._id+"');\" class='img-fluid my-thumbnail float-left letterpic' title='" + c.name + "' src='" + c.thumbnail + "' alt='Default image'>"+
                            "</a>"+
                          "</div>"+
                          "<div class='col-10'>" +
                                "<div class='row'>" +
                                    "<div class='col'><h4>"+  c.name +"</h4></div>"+
                                    "<div class='col'>Type: "+ type +"</div>"+
                                    "<div class='col'>Admin: " + c.owner.name +"</div>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<div class='col-12'>Description: "+ 
                                        c.description  +
                                        "</div>"+
                                "</div>"+
                          "</div>"+
                "</div>"+
                "<div class='row'>" +
                          "<div class='col'>  People: " + (c.maxUsers - c.usersLeft) + "/" + c.maxUsers + "</div>"+
                           "<div class='col'> Cards: "+ (c.maxLimit - c.cardsLeft) + "/" + c.maxLimit + "</div>"+
                            "<div class='col-md-4 col-xs-12'>"    +
                                "<a onClick=\"join('"+ c.name + "', 'discover', '"+c._id+"');\" class='col btn btn-success class-btn'>Join</a>"+
                           "</div>"+
                      "</div>"+  
                "</div>";
        $("#discover-classes-content").append(html);
    });
}