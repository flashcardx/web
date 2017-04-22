function resendEmail(){
    $("#errorMsg").html("Loading...");
    $.ajax({
        url:"/resend-email",
        success: function(result){
            $("#errorMsg").hide();
            if(result.success){
                $(".container").prepend(""   +
                "<div class='alert alert-info'>" +
                "<strong>Success! </strong>" + result.msg + "</div>");
            }
            else{
                $(".container").prepend(""   +
                "<div class='alert alert-danger'>" +
                "<strong>Error! </strong>" + result.msg + "</div>");
            }
        },
        error: function(err){
            $("#errorMsg").hide();
            $(".container").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + err + "</div>");
        }
    });
}