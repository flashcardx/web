
getPosts(()=>{
    renderEmojisInput("#textarea-1501483512653");
});

function renderEmojisInput(selector){
    $(selector).emojioneArea({ pickerPosition: "bottom",
                            filtersPosition: "bottom",
                            tonesStyle: "radio"
                            });
}

function renderEmojis(id){
    var input = $("#"+id).text();
    var output = emojione.toImage(input);
    var input = $("#"+id).html(output);
}

function renderEmojisText(text){
    return emojione.toImage(text);
}

function renderReactions(selector1, selector2){
    loadReactions(selector1, selector2, ()=>{
        console.log("reactions trigered");
    })                  
}

function submitReaction(emotion, postId, commentId){
    console.log("emotion: " + emotion );
    console.log("postId: " + postId);
    console.log("commentId: " + commentId);
}

function publish(){
    var text = $("#textarea-1501483512653")[0].emojioneArea.getText();
    var reactions = renderEmojisText("");
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
function publishReaction(reaction, inputId){
    $("#"+inputId).hide();
    var postId = $("#"+inputId).attr("data-post");
    var commentId = $("#"+inputId).attr("data-comment");
    console.log("postId: " + postId + ", commentId: " + commentId);
    if(commentId)
        reactComment(reaction, postId, commentId);
    else
        reactPost(reaction, postId);
}

function reactPost(reaction, postId){
    $.ajax({
        url: "/class/postReaction/" + classname,
        method: "post",
        data: {
            reaction: reaction,
            postId: postId
        },
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("Reaction sended!");
                // reload reactions for postId
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when sending reaction: " + JSON.stringify(err));
            showError("Something went wrong when sending reaction :(");
        }
    });
}

function reactComment(reaction, postId, commentId){

}

function getPosts(callback){
	  $.ajax({
        url: "/class/posts/"+classname,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderPosts(result.msg);
            }
            callback();
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when gettings posts: " + JSON.stringify(err));
            showError("Something went wrong when getting posts :(");
        }
    });
}

function renderPosts(posts){
    var html="";
    posts.forEach((p, i)=>{
        var reactionId = "post-reaction-"+p._id;
        var thumbnail = (p.userId.thumbnail)? p.userId.thumbnail : "http://undefined";
        if(i==0)
            html += "<div class='col mx-auto'>";
        else
            html += "<div class='col mx-auto margin-top'>";
        
           html+= "<div class='container card post'>"+
                              "<div class='row'>"+
                                  "<div class='col panel-heading'>"+
                                        "<div class='row'>"+
                                            "<div class='col'>"+
                                                    "<img style='float:left;' onerror=\"imgError('post-"+p._id+"');\" id='post-"+p._id+"' class='img-fluid my-thumbnail-3 float-left' src='"+thumbnail+"' title='"+p.userId.name+"' alt='User image'>"+
                                            "</div>"+
                                            "<div class='col'>" +
                                                    "<h4>" +
                                                        p.userId.name+
                                                    "</h4>"+
                                            "</div>"+
                                            "<div class='col'>"+
                                                    "<span class='text-muted'>"+ timeSince(new Date(p.updated_at)) +" ago. </span>"+        
                                            "</div>"+
                                        "</div>"+
                                    "</div>"+
                              "</div>"+
                                    "<div class='row'>"+
                                            "<div id='post-text-"+p._id+"' class='col post-text'>"+
                                                renderEmojisText(p.text)+
                                            "</div>"+
                                    "</div>"+
                                "<br/>"+
                            "<div class='row facebook-reaction'>"+
                               "<div class='col-2'>"+ 
                                        "<div class='emotion-btn'>"+
                                            "<div onClick=\"showReactions('"+reactionId+"')\" data-toggle='tooltip' data-placement='right' title='Add reaction' class='reaction-btn'>+ <i class='fa fa-smile-o' aria-hidden='true'></i> </div>"+
                                            "<div data-post='"+p._id+"' id='"+reactionId+"' class='reactions'><span onClick=\"publishReaction('likes','"+reactionId+"')\"class='reaction-emoji'>"+renderEmojisText("👍🏿") +"</span><span onClick=\"publishReaction('loves','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("❤") +"</span><span onClick=\"publishReaction('hahas','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😂") +"</span><span onClick=\"publishReaction('wows','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😲") +"</span><span onClick=\"publishReaction('sads','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😢") +"</span><span onClick=\"publishReaction('angrys','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😠") +"</span> </div>"+
                                        "</div>"+
                                "</div>"+      
                                "<div class='col-8'>";
                                if(parseInt(p.likes.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("👍🏿")+": "+p.likes.count+"</a>";
                                if(parseInt(p.loves.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("❤") +": "+p.loves.count+"</a>";
                                if(parseInt(p.hahas.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("😂") +": "+p.hahas.count+"</a>";
                                if(parseInt(p.wows.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("😲") +": "+p.wows.count+"</a>";
                                if(parseInt(p.sads.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("😢") +": "+p.sads.count+"</a>";
                                if(parseInt(p.angrys.count)!=0)
                                    html += "<a class='btn-a'>"+ renderEmojisText("😠") +": "+p.angrys.count+"</a>";
                                html+="</div>"+
                                "<div class='col-md-2 col-xs-12'>"+
                                    "<span> "+p.commentsSize+" Comments</span>"+
                                "</div>"+
                          "</div>" +
                          "<div class='row'>" +
                                    "<div class='comment-input input-group col'>"+
                                        "<input autocomplete='off' id='new-comment-"+p._id+"' type='text' class='form-control input-lg emoji-input'"+
                                        "placeholder='New comment'/>"+
                                        "<span class='input-group-btn'>"+
                                                "<button onClick=\"postComment('new-comment-"+p._id+"', '"+p._id+"')\";id ='search-button' class='btn btn-info' role='button' type='button'>"+
                                                    "<span>Comment</span>"+
                                                "</button>"+
                                            "</span>"+
                                    "</div>"+
                          "</div>";
                          p.comments.forEach((c,i)=>{
                                html += "<br/>";
                                var reactionId = "comment-reaction-"+c._id;
                                var thumbnail = (c.userId.thumbnail)? c.userId.thumbnail : "http://undefined";
                                html += "<div class='row'>"+
                                            "<div class='col comments-box comments-"+p._id+"'>"+
                                                "<div class='col panel-heading'>"+
                                                    "<div class='row'>"+
                                                        "<div class='col'>"+
                                                            "<img style='float:left;' onerror=\"imgError('img-c-"+c._id+"');\" id='img-c-"+c._id+"' class='img-fluid my-thumbnail-4 float-left' src='"+thumbnail+"' title='"+p.userId.name+"' alt='User image'>"+
                                                        "</div>"+
                                                        "<div class='col'>"+
                                                            "<h6>"+
                                                                c.userId.name+
                                                            "</h6>"+
                                                        "</div>"+
                                                        "<div class='col'>" + 
                                                            "<span class='text-muted'>"+ timeSince(new Date(p.updated_at)) +" ago. </span>"+        
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='row comment-text'>"+
                                                        "<div class='col'>"+
                                                            renderEmojisText(c.text)+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='row facebook-reaction'>"+
                                                                "<div class='col-2'>"+ 
                                                                        "<div class='emotion-btn-sm'>"+
                                                                            "<div onClick=\"showReactions('"+reactionId+"')\" data-toggle='tooltip' data-placement='right' title='Add reaction' class='reaction-btn'>+ <i class='fa fa-smile-o' aria-hidden='true'></i> </div>"+
                                                                            "<div data-comment='"+c._id+"' data-post='"+p._id+"' id='"+reactionId+"' class='reactions'><span onClick=\"publishReaction('likes','"+reactionId+"')\"class='reaction-emoji'>"+renderEmojisText("👍🏿") +"</span><span onClick=\"publishReaction('loves','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("❤") +"</span><span onClick=\"publishReaction('hahas','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😂") +"</span><span onClick=\"publishReaction('wows','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😲") +"</span><span onClick=\"publishReaction('sads','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😢") +"</span><span onClick=\"publishReaction('angrys','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😠") +"</span> </div>"+
                                                                        "</div>"+
                                                                "</div>"+   
                                                                "<div class='col-8'>";
                                                                        if(parseInt(c.likes.count)!=0)
                                                                            html += "<a class='btn-a'> Like: "+c.likes.count+"</a>";
                                                                        if(parseInt(c.loves.count)!=0)
                                                                            html += "<a class='btn-a'> Love: "+c.loves.count+"</a>";
                                                                        if(parseInt(c.hahas.count)!=0)
                                                                            html += "<a class='btn-a'> Haha: "+c.hahas.count+"</a>";
                                                                        if(parseInt(c.wows.count)!=0)
                                                                            html += "<a class='btn-a'> Wow: "+c.wows.count+"</a>";
                                                                        if(parseInt(c.sads.count)!=0)
                                                                            html += "<a class='btn-a'> Sad: "+c.sads.count+"</a>";
                                                                        if(parseInt(c.angrys.count)!=0)
                                                                            html += "<a class='btn-a'> Angry: "+c.angrys.count+"</a>";
                                                                html+="</div>"+
                                                    "</div>"+
                                            "</div>"+
                                        "</div>"+
                                "</div>";
                          });
                            var oldCommentsListed = $(".comments-"+p._id).length;
                        if(p.commentsSize > (p.comments.length + oldCommentsListed)){
                            html += "<div class='row'>"+
                                        "<div class='col-2 col-center'>"+
                                            "<button class='btn btn-info' id='more-comments-btn-"+p._id+"'> More comments</button>"+
                                        "</div>"+
                                    "</div>";
                            }
                    html += "</div></div>"; 
    });
    $("#posts").append(html);
    renderEmojisInput(".emoji-input");
}

function postComment(inputId, postId){
    console.log("inputId: " + inputId + ", postId: " + postId);
    var text = $("#"+inputId).val();
    console.log("text: " + text);
    var data = {
        text: text,
        postId: postId
    };
    $.ajax({
        url: "/class/commentPost/"+classname,
        method: "post",
        data: data,
        success: result=>{
            console.log("post comment: " + JSON.stringify(result));
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("You just commented!");
                $("#"+inputId)[0].emojioneArea.setText("");
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.error("Something went wrong when posting comment: " + JSON.stringify(err));
            showError("Something went wrong when posting comment :(");
        }
    });
}