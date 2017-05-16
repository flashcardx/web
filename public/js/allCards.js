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
        url:"/getAllCards" + queryString,
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
    if(!result || result.length === 0){
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
        var html ="<div class='card' id=" + card.counter+ ">"+
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
                "<div class='card-block'>"+
                    "<h4 id='speak"+card._id+"' class='card-title'>"+ card.name +" <i onCLick=\"speak(\'"+card._id+"\', \'"+card.lang+"\');\" class='speaker fa fa-volume-up' aria-hidden='true'></i></h4>"+
                    "<p class='card-text'>"+ checkUndefined(card.description) +"</p>"+
                    "<p class='card-text'><small class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. "+"</small>"+
                            "<small class='text-muted'>"+
                                    "By: "+ checkUndefined(card.ownerName)+
                                    "</small>"+
                            "</p>"+
                "</div>"+
                "</div>";
        $("#card-deck").append(html);
        $(".slick").not('.slick-initialized').slick({
            prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
        });

    });
}
