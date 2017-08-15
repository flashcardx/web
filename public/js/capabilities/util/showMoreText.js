function showMoreRender(selector){
    return;
    console.log("show more: " + selector);
    $(selector).readmore({collapsedHeight: 40}); 
}

function showMoreDestroyElement(element){
    element.readmore('destroy');
}