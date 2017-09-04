/*This function generates a number between 0 and 9*/
function ranNumbers(amount) {
  var number;
    number = Math.floor( Math.random() * 9 ) + 1;
  return number;
}

/*This function generates either a one or two.*/
function oneOrTwo() {
  var num = Math.floor( Math.random() * 2 ) + 1;
  return num;
}

/*This function generates a random letter*/
function ranLetter() {
  var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
      "t", "u", "v", "w", "x", "y", "z"]; /*Generate the alphabet*/
  var number = Math.floor( Math.random() * 26 );
  return alphabet[number];
}

function createPassword (quantity) {
  var password = [];
  for (var i = 0; i < quantity; i++) {
    var val = oneOrTwo(); /*decides between number or letter*/
    if ( val === 1 ) {
      password += ranLetter();
    } else {
      password += ranNumbers();
    }
  }
  return password;
}

var amountOfCharacters = parseInt( prompt( "How many characters do you want in your Password?" ) );


document.write( createPassword(amountOfCharacters) );
