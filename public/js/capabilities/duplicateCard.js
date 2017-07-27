function duplicateCard(id){
        $.ajax({
        url: "/duplicateCard" + "/" + id,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                showSuccess(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
};
