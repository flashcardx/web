getMyClasses();
var xhr;

function getMyClasses(){
    try { xhr.abort(); } catch(e){}
        xhr = $.ajax({
        url: "/classes",
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                appendClasses(result.msg);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when retrieving activity : " + JSON.stringify(err));
            showError("Something went wrong when retrieving your activity :(");
        }
    });
}

function appendClasses(classes){
    console.log("appends: " + JSON.stringify(classes));
    classes.forEach((c, i)=>{
        var html = "";
        if(i == 0) 
            html +=  " <div class='class'>";
        else
            html += " <div class='class top-buffer'>";
        html += " <div class='row'>"+
                          "<div class='col'>"+
                           "<a target='_blank' href='assets/img/default.png'>"+
                              "<img class='img-fluid thumbnail float-left' src='assets/img/default.png' alt='Default image'>"+
                            "</a>"+
                          "</div>"+
                          "<div class='col-5'>"+  c.name +"</div>"+
                          "<div class='col-5'>" + c.owner.name +"</div>"+
                      "</div>"+
                      "<div class='row'>"+
                          "<div class='col-12'>"+ 
                              c.description  +
                             "</div>"+
                      "</div>"+
                      "<div class='row'>" +
                          "<div class='col-4'>  People: " + (c.maxUsers - c.usersLeft) + "/" + c.maxUsers + "</div>"+
                          "<a class='col offset-md-3 btn btn-warning btn-sm'>Settings</a>"+
                         "<a class='col btn btn-success btn-sm'>Enter</a>"+
                      "</div>"+  
                "</div>";
       $("#classes-content").append(html);         
    });
}