$(document).ready(()=>{
    renderEmojisInput("#textarea-1501483512653");
});

getPosts();

function renderEmojisInput(selector){
    $(selector).emojioneArea({ pickerPosition: "bottom",
                            filtersPosition: "bottom",
                            tonesStyle: "radio"
                            });
}

function renderEmojisText(id){
    var input = $("#"+id).text();
    var output = emojione.toImage(input);
    var input = $("#"+id).html(output);
}

function renderReactions(){
      $(".facemocion").faceMocion({},(emotion, inputId)=>{
      });                          
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
        console.log("t1: " + p.userId.thumbnail);
        var thumbnail = (p.userId.thumbnail)? p.userId.thumbnail : "http://";
        console.log("t2: " + thumbnail);
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
                                                p.text+
                                            "</div>"+
                                    "</div>"+
                                "<br/>"+
                            "<div class='row facebook-reaction'>"+
                               "<div class='col-2'>"+ 
                                        "<div class='emotion-btn'>"+
                                            "<input id='public1' type='hidden' class='facemocion'/>"+
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
                          p.comments.forEach(c=>{
                                var thumbnail = (c.userId.thumbnail)? c.userId.thumbnail : "http://";
                                html += "<div class='row'>"+
                                            "<div class='comments-box comments-"+p._id+"'>"+
                                                "<div class='col panel-heading'>"+
                                                    "<div class='row'>"+
                                                        "<div class='col'>"+
                                                            "<img style='float:left;' onerror='imgError('img-c-"+c._id+"');' id='img-c-"+c._id+"' class='img-fluid my-thumbnail-4 float-left' src='"+thumbnail+"' title='"+p.userId.name+"' alt='User image'>"+
                                                        "</div>"+
                                                        "<div class='col'>"+
                                                            "<h6>"+
                                                                c.userId.name+
                                                            "</h6>"+
                                                        "</div>"+
                                                        "<div class='col'>" + 
                                                            "<span class='text-muted'>Some short time ago. </span>"+        
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='row comment-text'>"+
                                                        "<div class='col'>"+
                                                            c.text+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div class='row facebook-reaction'>"+
                                                                "<div class='col-2'>"+ 
                                                                        "<div class='emotion-btn-sm'>"+
                                                                            "<input id='public1' type='hidden' class='facemocion'/>"+
                                                                        "</div>"+
                                                                "</div>   "+   
                                                                "<div class='col-8'>"+
                                                                    "<a class='btn-a'> Like: 5 </a> <a class='btn-a'> Love: 1000</a> <a class='btn-a'> Haha: 1000</a> <a class='btn-a'> Wow: 1000</a> <a class='btn-a'> Sad: 1000</a> <a class='btn-a'> Angry: 1000</a>"+
                                                                "</div>"+
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
    $("#posts").append(html);
    renderEmojisText('post-text-'+p._id);
    });
    renderReactions();
    renderEmojisInput(".emoji-input");
}

function postComment(inputId, postId){
    console.log("inputId: " + inputId + ", postId: " + postId);
}