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
    cards.forEach((card, index1) => {
        if (card.description)
            var description = card.description.replace(/(\r\n|\n|\r)/g, "<br />");
        var view =
            "<div id='"+card.counter+"' class='card ev-panel ev-panel-card ev-height-discovery'>" +
            "<div class='ev-item'>" +
            "<div id='carousel" + index1 + "' class='carousel slide'>" +
            "<div class='owl-carousel owl-theme'>";
        if (card.imgs.length > 0) {
            card.imgs.forEach((img, index2) => {
                view += "<div class='slide-size'>" +
                            "<img class='d-block img-fluid owl-lazy' data-src='" + img.hash + "' alt='One moment!...'>" +
                        "</div>";
            });
        } else {
            view += "<div class='slide-fixed-size'>" +
                    "<img class='d-block img-fluid' src='assets/img/default.png' alt='One moment!...'>" +
                "</div>"
        }
        view += "</div>" +
            "</div>" +
            "</div>" +
            "<div class='ev-p'>" +
                "<h3 style='text-align:center; word-wrap: break-word;' id='speak" + card._id + "'>" + card.name + "" +
                "<i style='margin-left:6px' onCLick=\"speak(\'" + card._id + "\', \'" + card.lang + "\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i>" +
                "</h3>" +
                "<p style='text-align:left; word-wrap: break-word;' class='card-text card-description ev-more' id='description-" + card._id + "'>" +
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
    });
    $('.owl-carousel').owlCarousel({
            items:1,
            lazyLoad:true,
            margin:0
    });
    mathResetAll();
    viewMore(cards);
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