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
    if(end)
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
                                "<div id='carousel" + index1+"' data-interval='false' class='carousel slide' data-ride='carousel'>"+
                  "<div class='carousel-inner' role='listbox'>";
        card.imgs.forEach((img, index2)=>{
            if(index2===0){
                html += "<div class='carousel-item active'>" +
                                    "<img class='d-block img-fluid slide-size' src='" + imgUrl +"/" + img +"' alt='Card image'>" +
                                "</div>";
            }
            else{
                html +="<div class='carousel-item'>"+
                                "<img class='d-block img-fluid slide-size' src='" + imgUrl +"/" + img +"' alt='Card img'>" +
                            "</div>";
            }
        });                
        html += "<a class='carousel-control-prev' href='#carousel"+index1+"' role='button' data-slide='prev'>"+
                                "<span class='carousel-control-prev-icon' aria-hidden='true'></span>"+
                                "<span class='sr-only'>Previous</span>"+
                            "</a>"+
                            "<a class='carousel-control-next' href='#carousel"+index1+"' role='button' data-slide='next'>"+
                                "<span class='carousel-control-next-icon' aria-hidden='true'></span>"+
                                "<span class='sr-only'>Next</span>"+
                            "</a>"+
                    "</div>"+
                "</div>"+
                "<div class='card-block'>"+
                    "<h4 class='card-title'>"+ card.name + "</h4>"+
                    "<p class='card-text'>"+ checkUndefined(card.description) +"</p>"+
                    "<p class='card-text'><small class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. "+"</small>"+
                            "<small class='text-muted'>"+
                                    "By: "+ checkUndefined(card.creatorName)+
                                    "</small>"+
                            "</p>"+
                "</div>"+
                "</div>";
        $("#card-deck").append(html);
    });
}
