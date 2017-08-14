var form2Validate = "";
var input2fillReCaptcha = "";

function submit(token){
    $("#" + input2fillReCaptcha).val(token);
    $("#" + form2Validate).click();
    grecaptcha.reset();
} 

function validateSignin(){
    form2Validate = "submit-signin-btn";
    input2fillReCaptcha = "recaptcha-input-signin";
    grecaptcha.execute();
}

function validateSignup(){
    form2Validate = "submit-signup-btn";
    input2fillReCaptcha = "recaptcha-input-signup";
    grecaptcha.execute();
}

function showInfo(msg){
    $(".main").prepend(""   +
            "<div class='alert alert-info'>" +
            "<strong>Info! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-info").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}

function resendEmail(){
    $(".errorMsg").html("Loading...");
    $.ajax({
        url:"/resend-email",
        success: function(result){
            $(".errorMsg").hide();
            if(result.success){
                showInfo(result.msg);
            }
            else{
                showError(result.msg);
            }
        },
        error: function(err){
            $("#errorMsg").hide();
            showError(err);
        }
    });
}