var options = {
    url: function(phrase) {
		return "suggest/" + phrase;
	},

     getValue: "word",

  list: {	
    match: {
      enabled: true
    }
  },
  requestDelay: 500,

  theme: "square"
};



$("#title").easyAutocomplete(options);