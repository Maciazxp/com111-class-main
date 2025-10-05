/*
    Prime Factorization - Have the user enter a number and find
    all Prime Factors (if there are any) and display them.
*/

var getPrimeFactors = function (n) {
  "use strict";

  function isPrime(n) {
    var i;

    for (i = 2; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        return false;
      }
    }
    return true;
  }

 let val = parseInt(document.getElementById('num').value); 
  var i,
    sequence = [];

  //TODO: Check which numbers are factors of n and also check if
  // that number also happens to be a prime

   for (i = 2; i <= val; i++) {
        if (val % i === 0) {
            if (isPrime(i)) {
                val /= i;
                sequence.push(i);
            }
        }
    }

    let res = sequence.join(" ");
    document.getElementById('pf').innerHTML = res;
  };




// the prime factors for this number are: [ 2, 3, 5, 7, 11, 13 ]
console.log(getPrimeFactors(30030));
