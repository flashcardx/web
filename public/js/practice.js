var cards = [];
var actualCardId;
var addDaysBad,
    addDaysOk,
    addDaysPerfect;

getCards();


function getCards() {
    $.ajax({
        url: "/practiceCards",
        success: result => {
            if (result.success === false)
                return showError(result.msg);
            if (result.msg.length === 0) {
                $("#card-deck").hide();
                $(".main").prepend("<h3 class='row'style='margin-top:15px;'>Well done! There are no cards left to practice. " +
                    "Come back tomorrow!</h3>");
                return;
            }
            cards.push(result.msg);
            showCards();
        },
        error: err => {
            showError(err);
        }
    });
}

function showCards() {
    if (cards.length === 0)
        getCards();
    var card = cards.shift()[0];
    actualCardId = card._id;
    var containerId = card.updated_at;
    var html = "<div class='card ev-panel ev-panel-card' id='" + containerId + "'>" +
        "<div id='carousel' class='carousel slide'>" +
        "<div class='slick'>";

    if (card.imgs)
        card.imgs.forEach((img, index2) => {
            var height = img.height;
            var width = img.width;
            while (height > 500 || width > 650) {
                width--;
                height--;
            }
            if (index2 === 0) {
                html += "<div class='active slide-fixed-size'>" +
                    "<div class='slide-size' style='height:" + height + "px;width:" + width + "px;overflow:hidden'>" +
                    "<img class='d-block img-fluid' data-lazy='" + img.hash + "' alt='One moment!...'>" +
                    "</div>" +
                    "</div>";
            }
            else {
                html += "<div class='slide-fixed-size'>" +
                    "<div class='slide-size' style='height:" + height + "px;width:" + width + "px;overflow:hidden'>" +
                    "<img class='d-block img-fluid' data-lazy='" + img.hash + "' alt='One moment!...'>" +
                    "</div>" +
                    "</div>";
            }
        });
    if (card.description)
        var description = card.description.replace(/(\r\n|\n|\r)/g, "<br />");
    html += "</div>" +
        "</div>" +
        "<div id='update-" + card._id + "' class='card-block container'>" +
        "<div class='row'>" +
        "<div class='col-12'>" +
        "<div data-category='" + card.category + "'>" +//do not delete this div, updateCard.js needs it to update card
        "<h4 id='speak" + card._id + "' class='card-title'><span>" + card.name + " </span><i onCLick=\"speak(\'" + card._id + "\', \'" + card.lang + "\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i></h4>" +
        "  <button style='display: none;'id='showAnswer' onClick='showAnswer();' role='button' class='col-12 left-margin btn btn-success' type='button'>Show answer</button>"+
        "<p id='description-" + card._id + "'class='card-text card-description'>" + checkUndefined(description).replace(new RegExp(card.name, 'g'),"??? ") + "</p>" +
        "<p class='card-time card-text'><small id='update-time-" + card._id + "'class='text-muted format-date'>Updated " + timeSince(new Date(card.updated_at)) + " ago. " + "</small>" +
        "</p>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>" +
        "</div>";
    $("#card-deck").html(html);
    $(".card").hide();
    $(".card").slideToggle('slow');
    $(".card-title").hide();
    $(".slick").not('.slick-initialized').slick({
        lazyLoad: 'ondemand',
        slidesToShow: 1,
        slidesToScroll: 1,
        prevArrow: "<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
        nextArrow: "<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
    });
    calcAndfillAddDays(card.supermemo);
    $("#showAnswer").fadeIn();
}

function calcAndfillAddDays(supermemo){
    addDaysBad = calcDays(supermemo, 0);
    addDaysOk = calcDays(supermemo, 3);
    addDaysPerfect = calcDays(supermemo, 5);
    $("#rank-card-bad").text(" (" + addDaysBad + " days)");
    $("#rank-card-ok").text(" ("+ addDaysOk + " days)");
    $("#rank-card-perfect").text(" (" + addDaysPerfect + " days)");
}

function calcDays(supermemo, performanceRating){
     var correct = (performanceRating >= 3)? true : false;
     supermemo.easiness += -0.8 + 0.28 * performanceRating + 0.02 * performanceRating * performanceRating;
     if(supermemo.easiness > 5)
            supermemo.easiness = 5;
     if(supermemo.easiness < 1.3)
            supermemo.easiness = 1.3;
     supermemo.consecutiveCorrectAnswers = (correct===true)? supermemo.consecutiveCorrectAnswers+1 : 0;
     var dateNow = new Date();
     if(correct === true)
            return 6 * Math.pow(supermemo.easiness, supermemo.consecutiveCorrectAnswers - 1);
     else
        return 1;
}

function showAnswer() {
    $("#showAnswer").fadeOut();
    $(".card-title").fadeIn();
    window.setTimeout(() => {
        $('#rankCard-modal').modal('show');
    }, 2000);
}

function rankCard(addDays) {
    $.ajax({
        url: "/rankCard/" + actualCardId + "/" + addDays,
        success: result => {
            console.log("got back: " + JSON.stringify(result));
            if (result.success === false)
                return showError(result.msg);
            showCards();
        },
        error: err => {
            showError(err);
        }
    });


}

function rankCardBad(){
    rankCard(addDaysBad);
}

function rankCardOk(){
    rankCard(addDaysOk);
}

function rankCardPerfect(){
    rankCard(addDaysPerfect);
}