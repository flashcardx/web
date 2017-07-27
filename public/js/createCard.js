var parameter
var limitSelectCards = 3;
const IMGS_LOAD_LIMIT = 3;
var imgLoadAvailable = [1,2,3]; 

  $.ajax({
        url:"/categories",
        success: result=>{
            if(result.success === false)
                showError(result.msg);
            else
               fillCategories(result.msg);
        },
        error: err=>{
                showError(err);
        }
    });

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


function fillCategories(categories){
     categories.forEach(c=>{
         $('#category').append($('<option>', {
                value: c.name,
                text: c.name
            }));
     })
 }

 function newCategory(){
     var category = $('#new-category').val();
     if(!category)
        return;
      $('#category').append($('<option>', {
                value: category,
                text: category,
                selected: "selected"
            }));
     showSuccess("Your new category has been added to the list!");
 }

function search(){
    parameter = $("#search-box").val();
    if(parameter === "" || parameter === " "){
        $("#gallery").html("");
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
                displayGallery(result.msg.value);
        },
        error: err=>{
                showError(err);
        }
    });
}



function displayGallery(data){
    updateGallery(data);
    var addButton = "<button onClick='addImgs()'role='button' type='button' class='btn btn-success'>Add seleted cards</button>";
    $("#addButton").html(addButton);
}


function showWarningLimit(){
    showWarning("You can not select more images!");
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
    data.forEach(img=>{
        gallery += "<option data-img-previewWidth='"+img.thumbnail.width+"' data-img-previewHeight='"+img.thumbnail.height+"' data-img-width='"+img.width+"' data-img-height='"+img.height+"' data-img-src='"+img.thumbnailUrl+"' value='"+img.contentUrl+"'>   </option>";
     });
    gallery += "</select>";
    $("#gallery").html(gallery);
    $("select.image-picker").imagepicker({limit: limitSelectCards, limit_reached: showWarningLimit}); 
    var $container = $('.image_picker_selector');
    $container.imagesLoaded(function () {
        $container.masonry({
            columnWidth: 30,
            itemSelector: '.thumbnail'
        });
    });
}

function extractDataAndLoad(element){
         var preview = element.getAttribute("data-img-src");
         var original = element.getAttribute("value");
         var height = element.getAttribute("data-img-height");
         var width = element.getAttribute("data-img-width");
         var previewHeight = element.getAttribute("data-img-previewHeight");
         var previewWidth = element.getAttribute("data-img-previewWidth");
         loadImg(preview, original, width, height, previewHeight, previewWidth);
}

function addImgs(){
    var selected = $( ".image-picker option:selected");
    if(selected[0]){
         var element = selected[0];
         extractDataAndLoad(element);
    }
    if(selected[1]){
         var element = selected[1];
         extractDataAndLoad(element);
    }
    if(selected[2]){
        var element = selected[2];
        extractDataAndLoad(element);
    }
     $(".selected").click();
}

function loadDelimiter(number, height, width){
    var idContainer = "delimiterImg" + number;
    $("#"+idContainer).css("height", height+"px"); 
    $("#"+idContainer).css("width", width+"px");
}

function loadImg(preview, original, width, height, previewHeight, previewWidth){
    if(imgLoadAvailable.length <= 0)
            return showWarning("You can not add more images!");
    var numberFrameAvailable = imgLoadAvailable.shift();
    const idWrapper = "wrap-img" +  numberFrameAvailable;
    const idImg = "img" +  numberFrameAvailable;
    $("#" + idWrapper).find("img").attr("src", preview);
    loadDelimiter(numberFrameAvailable, previewHeight, previewWidth);
    $("#" + idWrapper).find(".close").show();
    $("#" + idImg).attr("value", original);
    $("#height" + numberFrameAvailable).attr("value", height);
    $("#width" + numberFrameAvailable).attr("value", width);
}

function closeImg(number){
    $("#close" + number).closest('.img-wrap').find('img').attr("src","assets/img/no-image.png");
    $("#close" + number).hide();
    var imgId = "fileInput" + number;
    var inputTextId = "img" + number;
    var idContainer = "delimiterImg" + number;
    $("#"+idContainer).css("height", "auto"); 
    $("#"+idContainer).css("width", "150px");
    document.getElementById(imgId).value = "";
    $('#' + inputTextId).removeAttr('value');
    imgLoadAvailable.push(number);
}

function getLoading(){
    return "<div class='mx-auto loader'></div>";
}

 function chooseFile() {
     if(imgLoadAvailable.length <= 0)
            return showWarning("You can not add more images!");
      var numberFrameAvailable = imgLoadAvailable[0];
      const idInput = "fileInput" + numberFrameAvailable;
      $("#" + idInput).click();
   }



function readURL(input, number) {
     
      const idWrapper = "wrap-img" +  number;
    
      const idImg = "img" +  number;

  if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            imgLoadAvailable.shift();
            var image = new Image();
            image.src = e.target.result;
            image.onload = function() {
                $('#' + idWrapper).find("img")
                    .attr('src', this.src)
                $("#" + idWrapper).find(".close").show();
                $("#height" + number).attr("value",this.height);
                $("#width" + number).attr("value",this.width);
            };
        };
        reader.readAsDataURL(input.files[0]);
  }
}