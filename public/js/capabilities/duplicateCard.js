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

function showSuccess(msg){
     $.notify({
            title: "Success,",
            icon:"fa fa-thumbs-up",
            message: msg
            },
            {
                type: 'success'
            }
            , {
	            newest_on_top: true
            }
        );
}


function showError(msg){
     $.notify({
            title: "Error,",
            icon:"fa fa-exclamation-triangle",
            message: msg
            },
            {
                type: 'danger'
            }
            , {
	            newest_on_top: true
            }
        );
}