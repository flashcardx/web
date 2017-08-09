var commentsCount = {};
var commentsSize = {};
setScroll();

function setScroll(){
    $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $(window).off("scroll"); 
        setTimeout(setScroll, 2000);
        getPosts();
        }
    });
}

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
				renderCommentReactions(result.msg.comments[0], postId, commentId);
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
    var html = generateReactionsPost(p, postId);
    $("#post-reaction-count-"+postId).html(html);
}

function renderCommentReactions(p, postId, commentId){
    var id = "comment-reaction-count-"+commentId;
    var html = generateReactionsComment(p, postId, commentId);
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

function generateReactionsComment(p, postId, commentId){
     var html = "";
        if(parseInt(p.likes.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'likes');\" class='btn-a'>"+ renderEmojisText("👍🏿")+": "+p.likes.count+"</a>";
        if(parseInt(p.loves.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'loves');\" class='btn-a'>"+ renderEmojisText("❤") +": "+p.loves.count+"</a>";
        if(parseInt(p.hahas.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'hahas');\" class='btn-a'>"+ renderEmojisText("😂") +": "+p.hahas.count+"</a>";
        if(parseInt(p.wows.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'wows');\" class='btn-a'>"+ renderEmojisText("😲") +": "+p.wows.count+"</a>";
        if(parseInt(p.sads.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'sads');\" class='btn-a'>"+ renderEmojisText("😢") +": "+p.sads.count+"</a>";
        if(parseInt(p.angrys.count)!=0)
                html += "<a data-toggle='modal' data-target='#reactions-modal' onClick=\"showCommentReactionPeople('"+postId+"', '"+commentId+"', 'angrys');\" class='btn-a'>"+ renderEmojisText("😠") +": "+p.angrys.count+"</a>";
    return html;
}

function showCommentReactionPeople(postId, commentId, reaction){
    $.ajax({
        url: "/class/commentReactionDetail/"+postId+"/"+ commentId+"/" + reaction,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderReactionModal(result.msg.comments[0][reaction].usersId);
            }
        },
        error: err=>{
            if(err.statusText == "abort")
                return;
            console.error("Something went wrong when getting reaction detail: " + JSON.stringify(err));
            showError("Something went wrong when getting reaction detail :(");
        }
    });
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
        var thumbnail = "http://undefined" + Math.random();
        if(u.thumbnail)
            thumbnail = u.thumbnail;
        html += "<tr><td><img id='img-modal-reaction-"+u._id+"' onerror=\"imgError('img-modal-reaction-"+u._id+"');\" class='img-fluid my-thumbnail float-left' title='"+u.name+"' src='"+thumbnail+"' alt='User thumbnail'></td>"+
        "<td>"+u.name+"</td> </tr>";
    })
    html+= "</tbody></table>";
    $("#modal-reactions-body").html(html);
}

function getLastId(){
    var lastPost = $(".post").last();
    if(!lastPost)
        return undefined;
    return lastPost.attr("data-postId");
}

function getPosts(){
    var lastId = getLastId();
    var url ="/class/posts/" + classname + "?last=" + lastId;   
    $.ajax({
        url: url,
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
        
           html+= "<div data-postId='"+p._id+"' id='post-" + p._id + "' class='container card post'>"+
                              "<div class='row'>"+
                                  "<div class='col panel-heading'>"+
                                        "<div class='row'>"+
                                            "<div class='col'>"+
                                                    "<img style='float:left;' onerror=\"imgError('img-post-"+p._id+"');\" id='img-post-"+p._id+"' class='img-fluid my-thumbnail-3 float-left' src='"+thumbnail+"' title='"+p.userId.name+"' alt='User image'>"+
                                            "</div>"+
                                            "<div class='col'>" +
                                                    "<h4>" +
                                                        p.userId.name+
                                                    "</h4>"+
                                            "</div>"+
                                            "<div class='col'>"+
                                                    "<span class='text-muted'>"+ timeSince(new Date(p.created_at)) +" ago. </span>"+        
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
                          "</div><div id='comment-box-"+p._id+"' class='comment-box'>";
                          var length = p.comments.length;
                          for(var i=0; i<length; i++){
                                var c = p.comments.pop();
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
                                                            "<span class='text-muted'>"+ timeSince(new Date(c.date)) +" ago. </span>"+        
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
                                                                        html += generateReactionsComment(c, p._id, c._id);
                                                                html+="</div>"+
                                                    "</div>"+
                                            "</div>"+
                                        "</div>"+
                                "</div>";
                          }
                            commentsCount[p._id] = length;
                            commentsSize[p._id] = p.commentsSize;
                            var oldCommentsListed = $(".comments-"+p._id).length;
                        if(p.commentsSize > (length + oldCommentsListed)){
                            html += "<div id='more-comments-btn-"+p._id+"' class='row'>"+
                                        "<div class='col-2 col-center'>"+
                                            "<button onClick=\"loadMoreComments('"+p._id+"', '"+p.commentsSize+"');\" class='btn btn-info'> More comments</button>"+
                                        "</div>"+
                                    "</div>";
                            }
                    html += "</div></div></div>"; 
    });
    $("#posts").append(html);
    setTimeout(function() {
        renderEmojisInput(".emoji-input");
    }, 60);
}

function loadMoreComments(postId, commentsSize){
    var listed = commentsCount[postId];
    var roof = commentsSize - listed;
    var skip = roof - 6;
    if(skip < 0)
        skip = 0;
    var limit = Math.abs(commentsSize - (listed+skip));
    if(limit <= 0)
        throw "limit can not be negative";
    if(limit > 6 )
        limit = 6;
    $.ajax({
        url: "/class/comments/"+postId +"?skip="+skip + "&limit=" + limit,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
				renderComments(result.msg.comments, result.msg.commentsSize, postId);
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

function renderComments(comments, commentsSize, postId){
    var html = "";
    var length = comments.length;
    var listed = commentsCount[postId];
    for(var i=0; i< length; i++){
            var c = comments.pop();
            html += "<br/>";
            var reactionId = "comment-reaction-"+c._id;
            var thumbnail = (c.userId.thumbnail)? c.userId.thumbnail : "http://undefined";
            html += "<div class='row'>"+
                        "<div class='col comments-box comments-"+postId+"'>"+
                            "<div class='col panel-heading'>"+
                                "<div class='row'>"+
                                    "<div class='col'>"+
                                        "<img style='float:left;' onerror=\"imgError('img-c-"+c._id+"');\" id='img-c-"+c._id+"' class='img-fluid my-thumbnail-4 float-left' src='"+thumbnail+"' title='"+c.userId.name+"' alt='User image'>"+
                                    "</div>"+
                                    "<div class='col'>"+
                                        "<h6>"+
                                            c.userId.name+
                                        "</h6>"+
                                    "</div>"+
                                    "<div class='col'>" + 
                                            "<span class='text-muted'>"+ timeSince(new Date(c.date)) +" ago. </span>"+        
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
                                                "<div data-comment='"+c._id+"' data-post='"+postId+"' id='"+reactionId+"' class='reactions'><span onClick=\"publishReaction('likes','"+reactionId+"')\"class='reaction-emoji'>"+renderEmojisText("👍🏿") +"</span><span onClick=\"publishReaction('loves','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("❤") +"</span><span onClick=\"publishReaction('hahas','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😂") +"</span><span onClick=\"publishReaction('wows','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😲") +"</span><span onClick=\"publishReaction('sads','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😢") +"</span><span onClick=\"publishReaction('angrys','"+reactionId+"')\" class='reaction-emoji'> "+renderEmojisText("😠") +"</span> </div>"+
                                                "</div>"+
                                            "</div>"+   
                                            "<div id='comment-reaction-count-"+c._id+"' class='col-8'>";
                                                html += generateReactionsComment(c, postId, c._id);
                                            html+="</div>"+
                                        "</div>"+
                                    "</div>"+
                                "</div>"+
                            "</div>" + 
                        "</div>"
                    "</div>";
    }
                var oldCommentsListed = $(".comments-"+postId).length;
                if(commentsSize > (length + oldCommentsListed)){
                    html += "<div id='more-comments-btn-"+postId+"' class='row'>"+
                            "<div class='col-2 col-center'>"+
                                "<button onClick=\"loadMoreComments('"+postId+"', '"+commentsSize+"');\" class='btn btn-info'> More comments</button>"+
                            "</div>"+
                        "</div>";
                    }
    commentsCount[postId] = listed + length;
    $("#more-comments-btn-"+postId).remove();
    $("#comment-box-"+postId).append(html);
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
            if(result.success == false)
                showError(result.msg);
            else{
                showSuccess("You just commented!");
                $("#"+inputId)[0].emojioneArea.setText("");
                // result should return comment from db with userId populated
                pushComment(result.msg, postId);
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

function pushComment(comment, postId){
    var newSize = commentsSize[postId]+1; //should be old commentsize +1
    commentsSize[postId] = newSize; 
    renderComments(new Array(comment), newSize, postId);
}