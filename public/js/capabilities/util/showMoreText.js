function showMoreRender(selector, cardId){
    $(selector).readmore({collapsedHeight: 40,
    moreLink: '<a href="#" id="readmore-'+cardId+'" >Read more</a>',
    lessLink: '<a href="#" id="readless-'+cardId+'">Read less</a>'}); 
}

function showMoreDestroyElement(element, cardId){
    element.readmore('destroy');
    $("#readmore-"+cardId).remove();
    $("#readless-"+cardId).remove();
}

function viewMore(cards) {
       cards.forEach(c=>{
            showMoreRender("#description-"+c._id, c._id);
        });
}