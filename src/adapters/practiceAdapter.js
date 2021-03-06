const LEVEL_CONSTANT = 0.2;

export function getLevel(points){
    return Math.floor(LEVEL_CONSTANT * Math.sqrt(points));
}


export function getUpperLimit(points){
    const nextLevel = getLevel(points) + 1;
    return Math.pow(nextLevel/LEVEL_CONSTANT, 2);
}

//returns a number between 0 and 10 telling how much both strings are diffenrent
function stringDifference(s1, s2) {
    s1 = s1.toLowerCase().trim();
    s2 = s2.toLowerCase().trim();

    var costs = [];
    for (var i = 0; i <= s1.length; i++) {
      var lastValue = i;
      for (var j = 0; j <= s2.length; j++) {
        if (i === 0)
          costs[j] = j;
        else {
          if (j > 0) {
            var newValue = costs[j - 1];
            if (s1.charAt(i - 1) !== s2.charAt(j - 1))
              newValue = Math.min(Math.min(newValue, lastValue),
                costs[j]) + 1;
            costs[j - 1] = lastValue;
            lastValue = newValue;
          }
        }
      }
      if (i > 0)
        costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}


export function calcRank(input, realName){
    const difference = stringDifference(realName, input);
    if(difference===0)
        return 5;
    if(difference<=2)
        return 3;
    return 1;
}