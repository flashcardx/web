
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

function renderReactions(selector){
      $(selector).faceMocion({},(emotion, inputId)=>{
          console.log("inputId: " + inputId);
          console.log("emotion: " + emotion);
          var postId = $("#"+inputId).attr("data-post");
          var commentId = $("#"+inputId).attr("data-comment");
          console.log("postId: " + postId + ", commentId" + commentId);
          var em;
          switch (emotion) {
                case "amo": em = "loves"
                            break;
                case "gusta": em = "likes"
                              break;
                case "divierte": em = "hahas"
                                 break;
                case "asombro": em = "wows"
                                break;
                case "triste": em = "sads"
                              break;
                case "molesto": em = "angrys"
                                break;
                default:{
                        console.error("invalid reaction");
                        return;
                     }
          }
         // submitReaction(em, postId, commentId);
      });                          
}

function submitReaction(emotion, postId, commentId){
    console.log("emotion: " + emotion );
    console.log("postId: " + postId);
    console.log("commentId: " + commentId);
}

function publish(){
    var text = $("#textarea-1501483512653")[0].emojioneArea.getText();
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
    posts.forEach((p, i)=>{
        var html="";
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
                                            "<input data-post='"+p._id+"' id='"+reactionId+"' type='hidden' class='facemocion'/>"+
                                        "</div>"+
                                "</div>"+      
                                "<div class='col-8'>";
                                if(parseInt(p.likes.count)!=0)
                                    html += "<a class='btn-a'> Like: "+p.likes.count+"</a>";
                                if(parseInt(p.loves.count)!=0)
                                    html += "<a class='btn-a'> Love: "+p.loves.count+"</a>";
                                if(parseInt(p.hahas.count)!=0)
                                    html += "<a class='btn-a'> Haha: "+p.hahas.count+"</a>";
                                if(parseInt(p.wows.count)!=0)
                                    html += "<a class='btn-a'> Wow: "+p.wows.count+"</a>";
                                if(parseInt(p.sads.count)!=0)
                                    html += "<a class='btn-a'> Sad: "+p.sads.count+"</a>";
                                if(parseInt(p.angrys.count)!=0)
                                    html += "<a class='btn-a'> Angry: "+p.angrys.count+"</a>";
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
                          $("#posts").append(html);
                          renderReactions("#" + reactionId);
                          p.comments.forEach((c,i)=>{
                                 html += "<br/>";
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
                                                                            "<input data-comment='"+c._id+"' data-post='"+p._id+"' id='comment-reaction-"+c._id+"' type='hidden' class='facemocion'/>"+
                                                                        "</div>"+
                                                                "</div>   "+   
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