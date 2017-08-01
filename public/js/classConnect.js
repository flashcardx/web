$(document).ready(()=>{
    $("#textarea-1501483512653").emojioneArea({ 
                                    pickerPosition: "bottom",
                                    filtersPosition: "bottom",
                                    tonesStyle: "radio"
                                    }
                                );
})

function publish(){
    var text = $("#textarea-1501483512653")[0].emojioneArea.getText();
    console.log("text: " + text);
    if(!text){
        showWarning("You must write something in order to publish it :)");
        return;
    }
    $.ajax({
        url: "/classConnect/post/" + classname,
        method: "post",
        data: {text:text},
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("Content published!");
                $("#textarea-1501483512653")[0].emojioneArea.setText("");
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when publishing: " + JSON.stringify(err));
            showError("Something went wrong when publishing :(");
        }
    });
}