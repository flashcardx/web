
      $.ajax({
        url: "/activityCount",
        success: result=>{
            console.log("result: " + JSON.stringify(result));
            if(result.success == false)
                showError(result.msg);
            else{
                fillActivityBadge(result.msg);
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving activity : " + JSON.stringify(err));
            showError("Something went wrong when retrieving your activity :(");
        }
    });

function fillActivityBadge(n){
    console.log("got: " + n);
    if(n != 0){
        $("#activty-badge").text(n).show();
    }
}


var xhr2;
var endActivity = false;
var firstTimeActivity = true;
getActivity();
setActivityScroll();


function setActivityScroll(){
    jQuery(function($) {
    $('#activity-content').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
            var last = getLastActivity();
            getActivity(last);
            unsetActivityScroll();
          //  setTimeout(setScroll, 2000);
        }
    })
    });
}

function getLastActivity(){
    return $('#activity-content tr:last').attr('data-date');
}

function unsetActivityScroll(){
      $('#activity-content').off("scroll"); 
}

function getActivity(last){
    if(endActivity == true)
        return;
    var url = "/activity";
    if(last)
        url += "?last=" + last; 
     try { xhr2.abort(); } catch(e){}
        xhr2 = $.ajax({
        url: url,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                processResultActivity(result.msg);
                firstTimeActivity = false;
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving activity : " + JSON.stringify(err));
            showError("Something went wrong when retrieving your activity :(");
        }
    });

}


function processResultActivity(result){
    if(endActivity === true)
        return;
    if(result===undefined || result.length === 0){
        endActivity = true;
        if(firstTimeActivity)
             $("#activity-content").append("<p>Create a class for sharing cards and connectng with classmates!</p>");
       // $(window).off("scroll"); 
    }
    else
        appendActivity(result);
}

function appendActivity(elements){
    console.log("append activity: " + JSON.stringify(elements));
    var html = "<table style='width:100%'>";
    elements.forEach(e=>{
        if(e.seen == false)
            html += "<tr class='unseen' data-date='"+e.date+"'>";
        else 
            html += "<tr class='seen' data-date='"+ e.date+"'>";
        html += "<td>" + e.text + "</td><td>"+timeSince(new Date(e.date))+" ago.</td>     </tr>";
    });
    html += "</table";
        $("#activity-content").append(html);
}

