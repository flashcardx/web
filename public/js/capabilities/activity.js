
      $.ajax({
        url: "/activityCount",
        success: result=>{
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
    if(n != 0){
        $("#activty-badge").text(n).show();
    }
}



var xhr2;
var activityPage=0;
var firstTimeActivity = true;
var bussy = false;

function setActivityScroll(){
    jQuery(function($) {
    $('#activity-content').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 20) {
            getActivity();
            bussy = true;
        }
    })
    });
}


function unsetActivityScroll(){
      $('#activity-content').off("scroll"); 
}

function reloadActivity(){
      $("#activity-content").empty();
      activityPage = 0;
      getActivity();
      firstTimeActivity = true;
      setActivityScroll();
}

function getActivity(){
    if(bussy == true)
        return;
    var url = "/activity?page=" + activityPage;
     try { xhr2.abort(); } catch(e){}
        xhr2 = $.ajax({
        url: url,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                processResultActivity(result.msg);
                bussy = false;
                firstTimeActivity = false;
                activityPage++;
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

function processResultActivity(result){
    if(result===undefined || result.length === 0){
        unsetActivityScroll();
        if(firstTimeActivity)
             $("#activity-content").append("<p>Create a class for sharing cards and connectng with classmates!</p>");
       // $(window).off("scroll"); 
    }
    else
        appendActivity(result);
}

function appendActivity(elements){
    var html = "";
    if(firstTimeActivity == true)
        html += "<table style='width:100%'>";
    elements.forEach(e=>{
        if(e.seen == false)
            html += "<tr class='unseen' data-date='"+e.date+"'>";
        else 
            html += "<tr class='seen' data-date='"+ e.date+"'>";
        html += "<td class='activity-padding'>" + e.text + "</td><td>"+timeSince(new Date(e.date))+" ago.</td>     </tr>";
    });
    if(firstTimeActivity == true){
        html += "</table";
        $("#activity-content").append(html);
    }
    else
        $("#activity-content table").append(html);
}

