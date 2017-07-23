
getClassStats();


 function getClassStats(){
        $.ajax({
            url: "/classStats/"+classname,
            success: result=>{
                if(result.success == false)
                    showError(result.msg);
                else{
                    fillStats(result.msg);
                    fillIntegrants(result.msg);
                }
            },
            error: err=>{
                console.error("Something went wrong when retrieving class data : " + JSON.stringify(err));
                showError("Something went wrong when retrieving class data :(");
            }
        });
 }

 function fillStats(stats){
    var owner = (stats.owner.id==userId) ? "You" : stats.owner.name; 
    var cards = (stats.maxLimit - stats.cardsLeft) + "/" + stats.maxLimit; 
    var users = (stats.maxUsers - stats.usersLeft) + "/" + stats.maxUsers; 
    var type = (stats.isPrivate==false)? "Public": "Private";
    $("#st-owner").text(owner);
    $("#st-cards").text(cards);
    $("#st-users").text(users);
    $("#st-type").text(type);
 }



function fillIntegrants(Class){
    console.log("fill integrants: " + JSON.stringify(Class));
     $(".letterpic").letterpic({ fill: 'color' }); 
}