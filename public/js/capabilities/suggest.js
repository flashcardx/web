


var xhr;
$('#title').autoComplete({
    delay: 200,
    minChars: 3,
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
