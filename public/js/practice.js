var cards = [];
var actualCardId;

getCards();

function getCards(){
    $.ajax({
        url:"/practiceCards",
        success: result=>{
            if(result.success === false)
                return showError(result.msg);
            if(result.msg.length === 0){
                $("#card-deck").hide();
                $(".main-content").prepend("Well done! There are no cards that you left to practice. " +
                    "Come back tomorrow!");
                return;
            }
            cards.push(result.msg);
            showCards();
        },
        error: err=>{
            showError(err);
        }
    });
}

function showCards(){
    if(cards.length === 0)
        getCards();
    var card = cards.shift()[0];
    actualCardId = card._id;
    var containerId = card.updated_at;
    var html = "<div class='card' id='" + containerId + "'>" + 
                                      "<div id='carousel' class='carousel slide'>"+
                  "<div class='slick'>";

    if(card.imgs)
    card.imgs.forEach((img, index2)=>{
        var height = img.height;
        var width = img.width;
        while(height > 500 || width > 650){
            width--;
            height--;
        }
        if(index2===0){
                html += "<div class='active slide-fixed-size'>" +
                              "<div class='slide-size' style='height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                    "<img class='d-block img-fluid' data-lazy='" + img.hash +"' alt='One moment!...'>" +
                              "</div>"+
                             "</div>";
            }
        else{
                html +="<div class='slide-fixed-size'>"+
                               "<div class='slide-size' style='height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                    "<img class='d-block img-fluid' data-lazy='" + img.hash +"' alt='One moment!...'>" +
                              "</div>"+
                            "</div>";
            }
    });
    if(card.description)
            var description = card.description.replace(/(\r\n|\n|\r)/g,"<br />");
    html += "</div>"+
               "</div>"+
                "<div id='update-"+card._id+"' class='card-block container'>"+
                   "<div class='row'>"+
                       "<div class='col-10'>"+
                       "<div data-category='"+card.category+"'>"+//do not delete this div, updateCard.js needs it to update card
                           "<h4 id='speak"+card._id+"' class='card-title'><span>"+ card.name +" </span><i onCLick=\"speak(\'"+card._id+"\', \'"+card.lang+"\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i></h4>"+
                           "<p id='description-"+card._id+"'class='card-text card-description'>"+ checkUndefined(description) +"</p>"+
                           "<p class='card-time card-text'><small id='update-time-"+card._id+"'class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. "+"</small>"+
                           "</p>"+
                        "</div>" +
                       "</div>"+
                   "</div>"+
               "</div>"+
             "</div>"+
            "<button id='showAnswer' onClick='showAnswer();' role='button' class='left-margin btn btn-success' type='button'>Show answer</button>";
    $("#card-deck").html(html);
    $(".card").hide();
    $(".card").slideToggle('slow');
    $(".card-title").hide();
    $(".slick").not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
        });
}

function showAnswer(){
    $(".card-title").fadeIn();
     window.setTimeout(()=>{
        $('#rankCard-modal').modal('show');
     }, 2000);
     $("#showAnswer").hide();
     window.setTimeout(()=>{
        $('#showAnswer').show();
     }, 2200);
}

function rankCard(mark){
    $.ajax({
        url:"/rankCard/" + actualCardId + "/" + mark,
        success: result=>{
            console.log("got back: " + JSON.stringify(result));
            if(result.success === false)
                return showError(result.msg);
            showCards();
        },
        error: err=>{
            showError(err);
        }
    });


}