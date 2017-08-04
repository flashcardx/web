function showReactions(idBox){
		console.log("idbox: " + idBox);
		$("#"+idBox).show();
		closeEvent("#"+idBox);
}


function closeEvent(selector){
	$(document).mouseup(function(e) 
	{
		var container = $(selector);
		// if the target of the click isn't the container nor a descendant of the container
		if (container.has(e.target).length === 0) 
		{
			container.hide();
		}
	});
}