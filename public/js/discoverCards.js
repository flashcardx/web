const MAX_HEIGHT = 500;
const MAX_WIDTH = 650;
var firstTime = true;
var end = false;
setScroll();
getMoreCards();

function setScroll(){

    $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $(window).off("scroll"); 
        setTimeout(setScroll, 2000);
        getMoreCards();
    }
    });
}

function getMoreCards(){
        var queryString ="";
        if(!firstTime){
            var last = getLast();
            if(last === undefined)
                return;
            queryString = "?last=" + last;
        }
        $.ajax({
        url:"/getDiscoverCards" + queryString,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else{
                processResult(result.msg);
                firstTime = false;
            }
        },
        error: err=>{
                showError(err);
        }
    });
}

function processResult(result){
    if(end === true)
        return;
    if(!result || result.length === 0){
        end = true;
        $(window).off("scroll"); 
    }
    else
        appendCards(result);
    if(firstTime===true && result.length <3)
        completeFooter(result.length)
}

function getLast(){
    return $('#card-deck div.card:last').attr('id');
}

function showError(msg){
    $(".main-content").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}

function appendCards(cards){
    cards.forEach((card, index1)=>{
    
    var html = "<div class='card' id='" + card.counter + "'>" + 
                             "<div id='carousel" + index1+"' class='carousel slide'>"+
                "<div class='slick'>";
    card.imgs.forEach((img, index2)=>{
        var height = img.height;
        var width = img.width;
        while(height > MAX_HEIGHT || width > MAX_WIDTH){
            width--;
            height--;
        }
        if(index2===0){
              html += "<div class='active slide-fixed-size'>" +
                              "<div class='slide-size' style='height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                    "<img class='d-block responsive' src='" + img.hash +"' alt='Card img'>" +
                              "</div>"+
                             "</div>";
            }
            else{
                html +="<div class='slide-fixed-size'>"+
                               "<div class='slide-size' style='height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                    "<img class='d-block responsive' src='" + img.hash +"' alt='Card img'>" +
                              "</div>"+
                            "</div>";
            }
    });
    html += "</div>"+
               "</div>"+
                "<div class='card-block container'>"+
                   "<div class='row'>"+
                       "<div class='col-10'>"+
                           "<h4 id='speak"+card._id+"' class='card-title'>"+ card.name +" <i onCLick=\"speak(\'"+card._id+"\', \'"+card.lang+"\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i></h4>"+
                          "<p class='card-text'>"+ checkUndefined(card.description) +"</p>"+
                           "<p class='card-text'><small class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. "+"</small>"+
                           "<small class='text-muted'>"+
                                   "By: "+ checkUndefined(card.ownerName)+
                                "</small>"+
                           "</p>"+
                         
                       "</div>"+
                       "<div class= 'col'>"+
                               "<div class='row'>"+
                                   "<a onClick=\"duplicateCard('"+card._id+"')\" role='button' class='btn nounderline btn-primary my-2 my-sm-1'> <i class='fa fa-share fa-fw' aria-hidden='true'></i></a>"+
                               "</div>"+
                       "</div>"+
                   "</div>"+
               "</div>"+
             "</div>";
    $("#card-deck").append(html);
     $(".slick").not('.slick-initialized').slick({
            prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
        });
    });
}

function completeFooter(n){
    var html = "";
    if(n === 0){
        html += "There is no people creating cards in this languaje yet. Help us create a community and win special gifts ;)<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>";
    }
    else
        html += "<br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>";
    $("#card-deck").append(html);
}


