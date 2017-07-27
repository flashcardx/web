function duplicateCard(id){
        console.log("duplicate card 2 userid: " + id);
        $.ajax({
        url: "/duplicateCardClassUser/" + classname + "/" + id,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                showSuccess("The card is now is in your collection!");
        },
        error: err=>{
                showError(err);
        }
    });
};


function duplicateCardFeed(id, classname){
        console.log("duplicate card 2 userid: " + id);
        $.ajax({
        url: "/duplicateCardClassUser/" + classname + "/" + id,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                showSuccess("The card is now is in your collection!");
        },
        error: err=>{
                showError(err);
        }
    });
};
