


var xhr;
$('#title').autoComplete({
    delay: 300,
    minChars: 3,
    onSelect: suggestionSelected,
    source: function(term, response){
        try { xhr.abort(); } catch(e){}
        xhr = $.getJSON("suggest/" + term, function(data){
          var s = [];
          data.forEach(v=>{
                s.push(v.word);
              });
           response(s);
           });
    },
});

function suggestionSelected(event, term, item){
    console.log("term: " + term );
    autocomplete();
}