FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
});

function statusChangeCallback(response){
    console.log("response: " + response);
}