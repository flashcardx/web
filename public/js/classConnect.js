getPosts();

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
                reloadReactionsPost(postId);
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

function reloadReactionsPost(postId){
    $.ajax({
        url: "/class/postReactions/"+postId,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderPostReactions(result.msg, postId);
            }
        },
        error: err=>{
            if(err.statusText == "abort")
                return;
            console.error("Something went wrong when gettings posts: " + JSON.stringify(err));
            showError("Something went wrong when getting posts :(");
        }
    });
}

function reloadReactionsComment(postId, commentId){
    $.ajax({
        url: "/class/commentReactions/"+postId + "/" + commentId,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderCommentReactions(result.msg.comments[0], commentId);
            }
        },
        error: err=>{
            if(err.statusText == "abort")
                return;
            console.error("Something went wrong when gettings posts: " + JSON.stringify(err));
            showError("Something went wrong when getting posts :(");
        }
    });
}


function reactComment(reaction, postId, commentId){
     $.ajax({
        url: "/class/commentReaction/" + classname,
        method: "post",
        data: {
            reaction: reaction,
            postId: postId,
            commentId: commentId
        },
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("Reaction sended!");
                reloadReactionsComment(postId, commentId);
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

function renderPostReactions(p, postId){
    var id = "post-reaction-count-"+postId;
    var html = generateReactionsPost(p, postId);
    $("#"+id).html(html);
}

function renderCommentReactions(p, commentId){
    console.log("rendering: " + JSON.stringify(p) + " for comment: " + commentId);
    var id = "comment-reaction-count-"+commentId;
    var html = generateReactionsComment(p, commentId);
    $("#"+id).html(html);
}

function generateReactionsPost(p, postId){
     var html = "";
        if(parseInt(p.likes.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'likes');\" class='btn-a'>"+ renderEmojisText("👍🏿")+": "+p.likes.count+"</a>";
        if(parseInt(p.loves.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'loves');\" class='btn-a'>"+ renderEmojisText("❤") +": "+p.loves.count+"</a>";
        if(parseInt(p.hahas.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'hahas');\" class='btn-a'>"+ renderEmojisText("😂") +": "+p.hahas.count+"</a>";
        if(parseInt(p.wows.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'wows');\" class='btn-a'>"+ renderEmojisText("😲") +": "+p.wows.count+"</a>";
        if(parseInt(p.sads.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'sads');\" class='btn-a'>"+ renderEmojisText("😢") +": "+p.sads.count+"</a>";
        if(parseInt(p.angrys.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+postId+"', 'angrys');\" class='btn-a'>"+ renderEmojisText("😠") +": "+p.angrys.count+"</a>";
    return html;
}

function generateReactionsComment(p, commentId){
     var html = "";
        if(parseInt(p.likes.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'likes');\" class='btn-a'>"+ renderEmojisText("👍🏿")+": "+p.likes.count+"</a>";
        if(parseInt(p.loves.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'loves');\" class='btn-a'>"+ renderEmojisText("❤") +": "+p.loves.count+"</a>";
        if(parseInt(p.hahas.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'hahas');\" class='btn-a'>"+ renderEmojisText("😂") +": "+p.hahas.count+"</a>";
        if(parseInt(p.wows.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'wows');\" class='btn-a'>"+ renderEmojisText("😲") +": "+p.wows.count+"</a>";
        if(parseInt(p.sads.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'sads');\" class='btn-a'>"+ renderEmojisText("😢") +": "+p.sads.count+"</a>";
        if(parseInt(p.angrys.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showPostReactionPeople('"+commentId+"', 'angrys');\" class='btn-a'>"+ renderEmojisText("😠") +": "+p.angrys.count+"</a>";
    return html;
}

function showPostReactionPeople(postId, emotion){
    $.ajax({
        url: "/class/postReactionDetail/"+postId+"/"+emotion,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderReactionModal(result.msg[emotion].usersId);
            }
        },
        error: err=>{
            if(err.statusText == "abort")
                return;
            console.error("Something went wrong when gettings posts: " + JSON.stringify(err));
            showError("Something went wrong when getting posts :(");
        }
    });
}

function renderReactionModal(users){
    var html = "<table class='table table-responsive'> <tbody>";
    users.forEach(u=>{
        var thumbnail = "http://undefined";
        if(u.thumbnail)
            thumbnail = u.thumbnail;
        html += "<tr><td><img id='user-img-"+u._id+"' onerror=\"imgError('user-img-"+u._id+"');\" class='img-fluid my-thumbnail float-left' title='"+u.name+"' src='"+thumbnail+"' alt='User thumbnail'></td>"+
        
        "<td>"+u.name+"</td> </tr>";
    })
    html+= "</tbody></table>";
    $("#modal-reactions-body").html(html);
}

function getPosts(){
	  $.ajax({
        url: "/class/posts/"+classname,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderPosts(result.msg);
            }
        },
        error: err=>{
            if(err.statusText == "abort")
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
                                "<div id='post-reaction-count-"+p._id+"' class='col-8'>";
                                        html += generateReactionsPost(p, p._id);
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
                                                    "<div style='margin-top:5px;' class='row facebook-reaction'>"+
                                                                "<div class='col-2'>"+ 
                                                                        "<div class='emotion-btn-sm'>"+
                                                                            "<div onClick=\"showReactions('"+reactionId+"')\" data-toggle='tooltip' data-placement='right' title='Add reaction' class='reaction-btn'>+ <i class='fa fa-smile-o' aria-hidden='true'></i> </div>"+
                                                                            "<div data-comment='"+c._id+"' data-post='"+p._id+"' id='"+reactionId+"' class='reactions'><span onClick=\"publishReaction('likes','"+reactionId+"')\"class='reaction-emoji'>"+renderEmojisText("👍🏿") +"</span><span onClick=\"publishReaction('loves','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("❤") +"</span><span onClick=\"publishReaction('hahas','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😂") +"</span><span onClick=\"publishReaction('wows','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😲") +"</span><span onClick=\"publishReaction('sads','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😢") +"</span><span onClick=\"publishReaction('angrys','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😠") +"</span> </div>"+
                                                                        "</div>"+
                                                                "</div>"+   
                                                                "<div id='comment-reaction-count-"+c._id+"' class='col-8'>";
                                                                        html += generateReactionsComment(c, c._id);
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
    setTimeout(function() {
        renderEmojisInput(".emoji-input");
    }, 60);
}

function postComment(inputId, postId){
    var text = $("#"+inputId).val();
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