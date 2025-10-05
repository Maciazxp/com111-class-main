/*
Pig Latin
*/

function igpayAtinlay(str) {
  var returnArray = [],
    wordArray = str.split(' ');

  for (var i = 0; i < wordArray.length; i++) {
    var word = wordArray[i];
    var firstVowelIndex = -1;
    for (var j = 0; j < word.length; j++) {
      if (/[aeiouAEIOU]/.test(word[j])) {
        firstVowelIndex = j;
        break;
      }
    }
    if (firstVowelIndex === 0) {
      returnArray.push(word + 'way');
    } else if (firstVowelIndex > 0) {
      var consonantCluster = word.slice(0, firstVowelIndex);
      var rest = word.slice(firstVowelIndex);
      returnArray.push(rest + consonantCluster + 'ay');
    } else {
      returnArray.push(word + 'ay');
    }
  }
  return returnArray.join(" ");
}
function translateToPigLatin() {
  let str = document.getElementById("word").value;
  let answer = document.getElementById("answer");
  answer.innerHTML = igpayAtinlay(str);
}
// Some examples of expected outputs
//console.log(igpayAtinlay("pizza")); // "izzapay"
//console.log(igpayAtinlay("apple")); // "appleway"
//console.log(igpayAtinlay("happy meal")); // "appyhay ealmay"
