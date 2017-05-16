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
        if(!firstTime)
            queryString = "?last=" + getLast();
        firstTime = false;
        $.ajax({
        url:"/getMyCards" + queryString,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                processResult(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
}

function processResult(result){
    if(end === true)
        return;
    if(result===undefined || result.length === 0){
        end = true;
        $(window).off("scroll"); 
    }
    else
        appendCards(result);
}

function getLast(){
    return $('#card-deck').children().last().attr('id');
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
    
    var html = "<div class='card' id='" + card.updated_at + "'>" + 
                                      "<div id='carousel" + index1+"' class='carousel slide'>"+
                  "<div class='slick'>";
    card.imgs.forEach((img, index2)=>{
        if(index2===0){
                html += "<div class='active slide-fixed-size'>" +
                              "<div class='slide-size' style='height:"+img.height+"px;width:"+img.width+"px;overflow:hidden'>"+
                                    "<img class='d-block responsive' src='" + img.hash +"' alt='Card img'>" +
                              "</div>"+
                             "</div>";
            }
        else{
                html +="<div class='slide-fixed-size'>"+
                               "<div class='slide-size' style='height:"+img.height+"px;width:"+img.width+"px;overflow:hidden'>"+
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
                           "</p>"+
                         
                       "</div>"+
                       "<div class= 'col'>"+
                               "<div class='row'>"+
                                    "<a role='button' class='btn nounderline btn-info my-2 my-sm-1' href='#'> <i class='fa fa-pencil-square-o fa-fw' aria-hidden='true'></i></a>"+
                                "</div>"+
                                "<div class='row'>"+
                                    "<a id='"+card._id+"' role='button' onClick=\"deleteCard('"+card._id+"','"+ card.updated_at +"')\" class='btn nounderline btn-danger delete-btn my-2 my-sm-1'> <i class='fa fa-trash fa-fw' aria-hidden='true'></i></a>"+
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

