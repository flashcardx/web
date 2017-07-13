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
        $.ajax({
        url:"/getMyCards" + queryString,
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

getMoreCards();

function completeFooter(n){
    var html = "";
    if(n === 0){
        html += "You don't have cards, start now and learn vocabulary as never before!";
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
    cards.forEach((card, index1)=>{// "<div class='card' id='" + containerId + "'>" +
    var containerId = card.updated_at;
    var html = 
        "<div class='ev-item'>" +
            "<div id='carousel" + index1+"' class='carousel slide'>"+
                  "<div class='slick'>";

    console.log(card.imgs.length);
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
            if(index2===0){
                    html += "<div class='active slide-fixed-size'>" +
                                  "<div class='slide-size' style='max-height: 200px; height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                        "<img class='d-block img-fluid' data-lazy='" + img.hash +"' alt='One moment!...'>" +
                                  "</div>"+
                                 "</div>";
                }
            else{
                    html +="<div class='slide-fixed-size'>"+
                                   "<div class='slide-size' style='max-height: 200px; height:"+height+"px;width:"+width+"px;overflow:hidden'>"+
                                        "<img class='d-block img-fluid' data-lazy='" + img.hash +"' alt='One moment!...'>" +
                                  "</div>"+
                            "</div>";
                }
        });
    } else { /*default image, when there is not image*/
       html +="<div class='slide-fixed-size'>"+
                   "<div class='slide-size' style='max-height: 200px; height:183px;width:274px;overflow:hidden'>"+
                        "<img class='d-block img-fluid' data-lazy='assets/img/default.png' alt='One moment!...'>" +
                  "</div>"+
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
                               "<h4 id='speak"+card._id+"' class='card-title'><span>"+ card.name +" </span><i onCLick=\"speak(\'"+card._id+"\', \'"+card.lang+"\');\" class='speaker fa fa-volume-up black' aria-hidden='true'></i></h4>"+
                               "<p id='description-"+card._id+"'class='card-text card-description ev-more'>"+ checkUndefined(description) +"</p>"+
                               "<p class='card-time card-text'><small id='update-time-"+card._id+"'class='text-muted format-date'>Updated "+ timeSince(new Date(card.updated_at)) +" ago. "+"</small>"+
                               "</p>"+
                            "</div>" +
                       "</div>"+
                   "</div>"+
                   "<div class='row>" + 
                        "<div class='col-md-12'>"+
                            "<div class= 'col' id='buttons-"+card._id+"'>"+
                                    "<a id='update-button-"+card._id+"'role='button' onClick=\"updateCard('"+ card._id +"')\" class='btn nounderline btn-info my-2 my-sm-1 ev-mr-10'> <i class='fa fa-pencil-square-o fa-fw' aria-hidden='true'></i></a>"+
                                    "<a id='"+card._id+"' role='button' onClick=\"deleteCard('"+card._id+"','"+ card.updated_at +"')\" class='btn nounderline btn-danger delete-btn my-2 my-sm-1'> <i class='fa fa-trash fa-fw' aria-hidden='true'></i></a>"+
                           "</div>"+
                        "</div>"+
                   "</div>"+
               "</div>";
    $("#card-deck").append("<div class='col-lg-4 col-md-6 col-sm-12'><div class='ev-panel ev-panel-card ev-height-collection'>"+html+"</div></div>");
    $(".slick").not('.slick-initialized').slick({
            lazyLoad: 'ondemand',
            slidesToShow: 1,
            slidesToScroll: 1,
            prevArrow:"<img class='a-left control-c prev slick-prev' src='assets/img/left-arrow.png'>",
            nextArrow:"<img class='a-right control-c next slick-next' src='assets/img/right-arrow.png'>"
        });
    });
    viewMore();
}

    function viewMore() {
        console.log("Entre en view more");
        var showChar = 20;  
        var ellipsestext = "...";
        var moretext = "Show more >";
        var lesstext = "Show less";

        $('.ev-more').each(function() {
            var content = $(this).html();
            var id = $(this).attr('id');
            if(content.length > showChar) {
                var initial = content.substr(0, showChar);
                var more = content.substr(showChar, content.length - showChar);
                var html = initial + "<span style='display:block;' id='ellipse-"+id+"'>"+ellipsestext+"</span><span id='morecontent-"+id+"' style='display:none'>"+more+"</span> <a id='btn-"+id+"' href='#' onClick=\"showtext(event,'morecontent-"+id+"','ellipse-"+id+"', 'btn-"+id+"')\" class='ev-morelink'>" + moretext + "</a>";
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
            btn.innerHTML="Show Less";
        } else {
            txtmore.style.display = 'none';
            txtellipse.style.display = 'block';
            btn.innerHTML="Show More";
        }
        event.preventDefault();

    }


