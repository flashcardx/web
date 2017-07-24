const MAX_HEIGHT = 500;
const MAX_WIDTH = 650;
var firstTime = true;
var end = false;
setScroll();
getMoreCards();


function setScroll() {

    $(window).scroll(function () {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            $(window).off("scroll");
            setTimeout(setScroll, 2000);
            getMoreCards();
        }
    });
}

var xhr;
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
    try { xhr.abort(); } catch(e){}
    xhr = $.ajax({
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
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving cards " + JSON.stringify(err));
            showError("Something went wrong when retrieving cards :(");
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
      $.notify({
            title: "Error,",
            icon:"fa fa-exclamation-triangle",
            message: msg
            },
            {
                type: 'danger'
            }
            , {
	            newest_on_top: true
            }
        );
}

function appendCards(cards) {
     console.log("got: " + cards.length);
    cards.forEach((card, index1) => {
        if (card.description)
            var description = card.description.replace(/(\r\n|\n|\r)/g, "<br />");
        var view =
            "<div id='"+card.counter+"' class='card ev-panel ev-panel-card ev-height-discovery'>" +
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
            view += "<div class='slide-fixed-size' style='height:250px; width: auto;overflow:hidden'>" +
                    "<img class='d-block img-fluid' data-lazy='assets/img/default.png' alt='One moment!...'>" +
                "</div>"
        }
        view += "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ev-p'>" +
                "<h3 style='text-align:center; word-wrap: break-word;' id='speak" + card._id + "'>" + card.name + "" +
                "<i style='margin-left:6px' onCLick=\"speak(\'" + card._id + "\', \'" + card.lang + "\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i>" +
                "</h3>" +
                "<p style='text-align:left; word-wrap: break-word;' class='ev-more' id='description-" + card._id + "'>" +
                checkUndefined(description) +
                "</p>" +
            "</div>" +
            "<div class='card-buttons'>"+
                    "<button data-toggle='tooltip' data-placement='right' title='Duplicate on my collection' onClick=\"duplicateCard('" + card._id + "')\" class=' ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-orange pull-right'>" +
                    "<i class='fa fa-share fa-fw'></i>" +
                    "</button>" +
                    "<span data-toggle='modal' data-target='#duplicate-on-class-modal'>" +
                        "<button onClick=\"getClasses('"+card._id+"');\" data-toggle='tooltip' data-placement='right' title='Duplicate on class' class='ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-violet pull-right'>" +
                        "<i class='fa fa-share fa-fw'></i>" +
                        "</button>" +
                    "</span>"+
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
    viewMore(cards);
}

    function viewMore(cards) {
        var showChar = 45;  
        var ellipsestext = "...";
        var moretext = "Show more >";
        var lesstext = "Show less";


        cards.forEach(c=>{
            var id = "description-" + c._id;
            var content = $("#" + id).html();
            if(c.description && c.description.length > showChar){
                var initial = content.substr(0, showChar);
                var more = content.substr(showChar, content.length - showChar);
                var html = initial + "<span style='display:block;' id='ellipse-"+id+"'>"+ellipsestext+"</span><span id='morecontent-"+id+"' style='display:none'>"+more+"</span> <a id='btn-"+id+"' href='#' onClick=\"showtext(event,'morecontent-"+id+"','ellipse-"+id+"', 'btn-"+id+"')\" class='ev-morelink'>" + moretext + "</a>";
                $("#" + id).html(html);
            }
        });
    }

function showtext(event, id, ellipse, btn) {
    var btn = document.getElementById(btn);
    var txtmore = document.getElementById(id);
    var txtellipse = document.getElementById(ellipse);
    if (txtmore.style.display === 'none') {
        txtmore.style.display = 'inline';
        txtellipse.style.display = 'none';
        btn.innerHTML = "Show less";
    } else {
        txtmore.style.display = 'none';
        txtellipse.style.display = 'block';
        btn.innerHTML = "Show more >";
    }
    event.preventDefault();

}

function completeFooter(n) {
    var html = "";
    if (n === 0) 
        html += "There is no people creating cards in this languaje yet. Help us create a community and win special gifts ;)";
    $("#card-deck").append(html);
}


var classId2Duplicate;
function getClasses(classId){
    classId2Duplicate = classId;
     $.ajax({
        url: "/classesShort",
        success: result => {
            if (!result.success)
                showError(result.msg);
            else 
                fillClasses(result.msg);
        },
        error: err => {
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving your classes " + JSON.stringify(err));
            showError("Something went wrong when retrieving your classes:(");
        }
    });
}

function fillClasses(classes){
    var html = "";
    classes.forEach(c=>{
        html += "<option value='"+c.name+"'>"+c.name+"</option>";    
    });
    $("#class-select").html(html);
}

function duplicate2Class(){
    var classname = $( "#class-select" ).val();
    $.ajax({
        url: "/duplicateCard2Class",
        method: "post",
        data: {
            classname: classname,
            cardId: classId2Duplicate
        },
        success: result=>{
            console.log("result duplicate class: " + JSON.stringify(result));
            if (!result.success)
                showError(result.msg);
            else 
                showSuccess("Card duplicated on class");
        },
        error: err => {
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving your classes " + JSON.stringify(err));
            showError("Something went wrong when retrieving your classes:(");
        }
    });
}