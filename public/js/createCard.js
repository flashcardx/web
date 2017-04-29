var parameter
var limitSelectCards = 3;
const IMGS_LOAD_LIMIT = 3;
var imgLoadAvailable = [1,2,3]; 

$("#search-box").keyup(function(event){
    if(event.keyCode == 13){
        $("#search-button").click();
    }
});

$("form").submit(function(){
    var title = $("#title")
});

$('#title').bind('keypress keyup blur', function() {
    $('#search-box').val($(this).val());
});


function search(){
    parameter = $("#search-box").val();
    if(parameter === "" || parameter === " "){
        $("#gallery").html("");
        $("#pagination").html("");
        $("#addButton").html("");
        return;
    }
    $("#gallery").html(getLoading());
    $.ajax({
        url:"/search/" + parameter,
        success: result=>{
            if(!result.success)
                showError(result.msg);
            else
                displayGallery(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });
}

function showError(msg){
    $(".container").prepend(""   +
            "<div class='alert alert-danger'>" +
            "<strong>Error! </strong>" + msg + "</div>");

    window.setTimeout(function() {$(".alert-danger").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}

function displayGallery(data){
    updateGallery(data);
    var addButton = "<button onClick='addImgs()'role='button' type='button' class='btn btn-default btn-outline-success'>Add seleted cards</button>";
    generatePagination(data);
    $("#addButton").html(addButton);
}

function showWarning(msg){
     $(".container").prepend(""   +
            "<div class='alert alert-warning'>" +
              msg + "</div>");

    window.setTimeout(function() {
    $(".alert-warning").fadeTo(500, 0).slideUp(500, function(){
        $(this).remove(); 
        });
        }, 4000);
}

function showWarningLimit(){
    showWarning("You can not select more images!");
}

function generatePagination(data){
    var pages = 0;
    if(data.hits.length !== 0)
        pages = data.totalHits / data.hits.length;
    var pagination = "<nav aria-label='Page navigation'>" +
                     "<ul class='pagination' id='pagination'></ul>" +
                    "</nav>";
    $("#pagination-container").html(pagination);
    var obj = $('#pagination').twbsPagination({
            totalPages: pages,
            visiblePages: 10,
            onPageClick: function (event, page) {
                updatePage(page);
            }
        });
}

function updatePage(page){
        $("#gallery").html(getLoading());
        $.ajax({
            url:"/search/" + parameter +"?page=" + page,
            success: result=>{
                if(!result.success)
                    showError(result.msg);
                else
                    updateGallery(result.msg);
            },
            error: err=>{
                    showError(err);
            }
        });
}

function updateGallery(data){
    var gallery = "<select multiple='multiple' class='image-picker'>"; 
    data.hits.forEach(img=>{
        gallery += "<option data-img-src='"+img.previewURL+"' value='"+img.webformatURL+"'>   </option>";
    });
    gallery += "</select>";
    $("#gallery").html(gallery);
    $("select").imagepicker({limit: limitSelectCards, limit_reached: showWarningLimit}); 
    var $container = $('.image_picker_selector');
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: 30,
            itemSelector: '.thumbnail'
        });
    });
}


function addImgs(){
    var selected = $( ".image-picker option:selected");
    if(selected[0]){
         var element = selected[0];
         var preview = element.getAttribute("data-img-src");
         var original = element.getAttribute("value");
         loadImg(preview, original);
    }
    if(selected[1]){
         var element = selected[1];
         var preview = element.getAttribute("data-img-src");
         var original = element.getAttribute("value");
         loadImg(preview, original);
    }
    if(selected[2]){
        var element = selected[2];
        var preview = element.getAttribute("data-img-src");
        var original = element.getAttribute("value");
        loadImg(preview, original);
    }
     $(".selected").click();
}

function loadImg(preview, original){
    if(imgLoadAvailable.length <= 0)
            return showWarning("You can not add more images!");
    var numberFrameAvailable = imgLoadAvailable.shift();
    const idImg = "wrap-img" +  numberFrameAvailable;
    $("#" + idImg).find("img").attr("src", preview);
    $("#" + idImg).find(".close").show();
     $("#" + idImg).find("input").attr("value", original);
}

function closeImg(number){
    $("#close" + number).closest('.img-wrap').find('img').attr("src","assets/img/no-image.png");
    $("#close" + number).hide();
    imgLoadAvailable.push(number);
}

function getLoading(){
    return "<div class='mx-auto loader'></div>";
}

