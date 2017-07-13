const MAX_HEIGHT = 500;
const MAX_WIDTH = 650;
var firstTime = true;
var end = false;
setScroll();
getMoreCards();

function setScroll() {

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            console.log(":::");
            $(window).off("scroll");
            setTimeout(setScroll, 2000);
            getMoreCards();
        }
    });
}

function getMoreCards() {
    if (end === true)
        return;
    var queryString = "";
    if (!firstTime) {
        var last = getLast();
        if (last === undefined)
            return;
        queryString = "?last=" + last;
    }
    $.ajax({
        url: "/getDiscoverCards" + queryString,
        success: result => {
            if (!result.success)
                showError(result.msg);
            else {
                processResult(result.msg);
                firstTime = false;
            }
        },
        error: err => {
            showError(err);
        }
    });
}

function processResult(result) {
    if (end === true)
        return;
    if (!result || result.length === 0) {
        end = true;
        $(window).off("scroll");
    }
    else
        appendCards(result);
    if (firstTime === true && result.length < 3)
        completeFooter(result.length)
}

function getLast() {
    return $('#card-deck div.card:last').attr('id');
}

function showError(msg) {
    $(".main-content").prepend("" +
        "<div class='alert alert-danger'>" +
        "<strong>Error! </strong>" + msg + "</div>");

    window.setTimeout(function () {
        $(".alert-danger").fadeTo(500, 0).slideUp(500, function () {
            $(this).remove();
        });
    }, 4000);
}

function appendCards(cards) {
    cards.forEach((card, index1) => {
        if (card.description)
            var description = card.description.replace(/(\r\n|\n|\r)/g, "<br />");
        var view =
            "<div class='ev-panel ev-panel-card ev-height-discovery'>" +
            "<div class='ev-item'>" +
            "<div id='carousel" + index1 + "' class='carousel slide'>" +
            "<div class='slick'>";
        if (card.imgs.length > 0) {
            card.imgs.forEach((img, index2) => {
        
                view += "<div class='active slide-fixed-size'>" +
                    "<div class='slide-size' style='height:250px; width: auto;overflow:hidden'>" +
                    "<img class='d-block img-fluid' data-lazy='" + img.hash + "' alt='One moment!...'>" +
                    "</div>" +
                    "</div>";

            });
        } else {
            view += "<div class='slide-fixed-size'>" +
                    "<img class='d-block img-fluid' data-lazy='assets/img/default.png' alt='One moment!...'>" +
                "</div>"
        }
        view += "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ev-p'>" +
            "<h3 style='text-align:center' id='speak" + card._id + "'>" + card.name + "" +
            "<i style='margin-left:6px' onCLick=\"speak(\'" + card._id + "\', \'" + card.lang + "\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i>" +
            "</h3>" +
            "<p class='ev-more' id='description-" + card._id + "'>" +
            checkUndefined(description) +
            "</p>" +
                "<div class='card-buttons'>" + 
                    "<button md-ink-ripple='' onClick=\"duplicateCard('" + card._id + "')\" class='ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-orange pull-right'>" +
                    "<i class='fa fa-share fa-fw'></i>" +
                    "</button>" +
                "</div" +
            "</div>" +
            
            "<p class='mycard-footer'>" +
            "<small class='text-muted format-date'>Updated " + timeSince(new Date(card.updated_at)) + " ago. " +
            "<span>By: " + checkUndefined(card.ownerName) + "</span>"
        "</small>" +
            "</p>" +
            "</div>";

        $("#card-deck").append("<div class='col-lg-4 col-md-6 col-sm-12'>" + view + "</div>");
        $(".slick").not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow: "<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
            nextArrow: "<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
        });
    });
    viewMore();
}

function viewMore() {
    console.log("Entre en view more");
    var showChar = 45;
    var ellipsestext = "...";
    var moretext = "Show more >";
    var lesstext = "Show less";

    $('.ev-more').each(function () {
        var content = $(this).html();
        var id = $(this).attr('id');
        if (content.length > showChar) {
            var initial = content.substr(0, showChar);
            var more = content.substr(showChar, content.length - showChar);
            var html = initial + "<span style='display:block;' id='ellipse-" + id + "'>" + ellipsestext + "</span><span id='morecontent-" + id + "' style='display:none'>" + more + "</span> <a id='btn-" + id + "' href='#' onClick=\"showtext(event,'morecontent-" + id + "','ellipse-" + id + "', 'btn-" + id + "')\" class='ev-morelink'>" + moretext + "</a>";
            $(this).html(html);
        }
    });
}

function showtext(event, id, ellipse, btn) {
    console.log(btn);
    var btn = document.getElementById(btn);
    console.log(btn);
    var txtmore = document.getElementById(id);
    var txtellipse = document.getElementById(ellipse);
    if (txtmore.style.display === 'none') {
        txtmore.style.display = 'block';
        txtellipse.style.display = 'none';
        btn.innerHTML = "Show Less";
    } else {
        txtmore.style.display = 'none';
        txtellipse.style.display = 'block';
        btn.innerHTML = "Show More";
    }
    event.preventDefault();

}

function completeFooter(n) {
    var html = "";
    if (n === 0) 
        html += "There is no people creating cards in this languaje yet. Help us create a community and win special gifts ;)";
    $("#card-deck").append(html);
}


