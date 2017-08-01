
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
    $('#activity-feed').on('scroll', function() {
        if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight - 20) {
            getActivity();
            bussy = true;
        }
    })
    });
}

function unsetActivityScroll(){
      $('#activity-feed').off("scroll"); 
}

function reloadActivity(){
      $("#activity-feed").empty();
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
             $("#activity-feed").append("<p><a href='/newClass'>Create a class</a> for sharing cards and connectng with classmates!</p>");
   }
    else
        appendActivity(result);
}

function appendActivity(elements){
    var html = "";
    elements.forEach(e=>{
        html += "<div class='feed-item' data-date='"+e.date+"'>";
        html += "<div class='date'>" + timeSince(new Date(e.date)) + " ago.</div>";
        if(e.seen == false)
            html += "<div class='text unseen'>" + e.text + "</div>";
        else
            html += "<div class='text seen'>" + e.text + "</div>";
        html += "</div>";
    });
    $("#activity-feed").append(html);
}

