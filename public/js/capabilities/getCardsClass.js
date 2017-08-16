var MAX_HEIGHT = 500;
var MAX_WIDTH = 650;// check append cards since i directly use those values theres, i couldnt get to work the variable with page speed
var firstTime = true;
var end = false;
var sort = "desc";
var category = "*";
var searchParameter;
setScroll();


function setScroll(){
    $(window).scroll(function() {
    if($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
        $(window).off("scroll"); 
        setTimeout(setScroll, 2000);
        getMoreCards();
    }
    });
}

function reloadCards(){
    end = false;
    firstTime = true;
    $("#card-deck").html("");
    idsUpdated = [];
    getMoreCards();
     $(window).off("scroll");
     setTimeout(setScroll, 2000);
}

function reloadForCategory(newCategory){
    if(newCategory === category)
        return;
    category = newCategory;
    reloadCards();
}

function reloadForSort(value){
    if(value === sort)
        return;
    sort = value;
    reloadCards();    
}

function reloadForSearch(q){
    if(q === searchParameter)
        return;
    searchParameter = q;
    reloadCards();
}

var xhr;
function getMoreCards(){
        if(end === true)
            return;
        var queryString = "?sort=" + sort;
        if(searchParameter)
            queryString += "&q=" + searchParameter;
        if(!firstTime){
            var last = getLast();
            if(last === undefined)
                return;
            queryString += "&last=" + last;
        }
        if(category !== "*")
            queryString += "&category=" + category;
        try { xhr.abort(); } catch(e){}
        xhr = $.ajax({
        url:"/classCards/" + classname + queryString,
        success: result=>{
            if(result.success == false)
                showError(result.msg);
            else{
                processResult(result.msg);
                firstTime = false;
            }
        },
        error: err=>{
            if(err.statusText === "abort")
                return;
            console.log("Something went wrong when retrieving cards : " + JSON.stringify(err));
            showError("Something went wrong when retrieving cards :(");
        }
    });
}

getMoreCards();

function completeFooter(n){
    var html = "";
    if(n === 0){
        html += "There are no cards in this class yet. You can duplicate the cards in your collection to a class and share them with classmates!";
    }
    $("#card-deck").append(html);
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
    if(firstTime===true && result.length <3)
        completeFooter(result.length)
}

function getLast(){
    return $('#card-deck div.ev-item:last').attr('id');
}


function cardAlreadyListed(cardId){
    var found = false;
    idsUpdated.forEach((id, index)=>{
        if(cardId === id)
            found = true;
    });
    return found;
}

function appendCards(cards){
    cards.forEach((card, index1)=>{
    if(sort==="asc" && cardAlreadyListed(card._id) === true)
        return;
    var containerId = card.updated_at;
    var html = 
        "<div id='"+containerId+"' class='ev-item'>" +
            "<div id='carousel" + index1+"' class='carousel slide'>"+
                  "<div class='owl-carousel owl-theme'>";

    if (card.imgs.length>0) {
        card.imgs.forEach((img, index2)=>{
            var height = img.height;
            var width = img.width;
            while(height > 500 || width > 650){
                width--;
                height--;
            }
            if (height>200) {
                height=200;
            }
            html += "<div class='slide-fixed-size'>" +
                                  "<img class='d-block img-fluid owl-lazy' data-src='" + img.hash +"' alt='One moment!...'>" +
                    "</div>";
        });
    } else { /*default image, when there is not image*/
       html +="<div class='slide-fixed-size'>"+
                    "<img class='d-block img-fluid' src='/assets/img/default.png' alt='One moment!...'>" +
             "</div>"
    }


    if(card.description)
            var description = card.description.replace(/(\r\n|\n|\r)/g,"<br />");
    html += "</div>"+
               "</div>"+
                "</div>"+
                "<div id='update-"+card._id+"' class='card-block container'>"+
                   "<div class='row'>"+
                       "<div class='col-12'>"+
                           "<div data-category='"+card.category+"'>"+//do not delete this div, updateCard.js needs it to update card
                               "<h4 style='word-wrap: break-word;' id='speak"+card._id+"' class='card-title'><span>"+ card.name +" </span><i onCLick=\"speak(\'"+card._id+"\', \'"+card.lang+"\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i></h4>"+
                               "<p data-rawtext='"+  checkUndefined(description) +"' style='text-align:left; word-wrap: break-word;' id='description-"+card._id+"'class='card-text card-description ev-more'>"+ checkUndefined(description) +"</p>"+
                            "</div>" +
                       "</div>"+
                   "</div>"+
                   "<div style='margin-top:33px;' class='row'>" + 
                        "<div class='col-md-12'>"+
                            "<div  id='buttons-"+card._id+"' style='float:right;' class='card-buttons' id='buttons-"+card._id+"'>"+
                                "<button  style='float:right;' data-toggle='tooltip' data-placement='right' title='Delete' onClick=\"deleteCard('"+card._id+"')\"  class=' ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-red pull-right'>" +
                                    "<i class='fa fa-trash fa-fw'></i>" +
                                "</button>" +
                                "<button id='update-button-"+card._id+"' style='float:right;' data-toggle='tooltip' onClick=\"updateCard('"+ card._id +"')\" data-placement='right' title='Edit' class='ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-yellow pull-right'>" +
                                        "<i class='fa fa-pencil-square-o fa-fw'></i>" +
                                    "</button>" +
                                "<button onClick=\"duplicateCard('"+card._id+"');\" style='float:right;' data-toggle='tooltip' data-placement='right' title='Duplicate on my collection' class='ev-btn-fab md-fab ev-md-fab ev-md-fab-offset ev-m-r ev-orange pull-right'>" +
                                        "<i class='fa fa-share fa-fw'></i>" +
                                    "</button>" +
                            "</div>" +
                        "</div>"+
                   "</div>"+
                   "<div class='mycard-footer'>"+
                   "<p class='card-time card-text'><small id='update-time-"+card._id+"'class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. By: "+ card.ownerName +"</small>"+
                               "</p>"+
                   "</div>"+
               "</div>";
    $("#card-deck").append("<div id='"+card._id+"' class='col-lg-4 col-md-6 col-sm-12'><div class='ev-panel ev-panel-card ev-height-collection'>"+html+"</div></div>");
        $('.owl-carousel').owlCarousel({
                items:1,
                lazyLoad:true,
                margin:0
        });
    });
    mathResetAll();
    viewMore(cards);
}



