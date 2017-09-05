/*This function generates a number between 0 and 9*/
function ranNumbers(amount) {
  let number = [];
  for (let i = 0; i < amount; i++ ) {
      number += Math.floor( Math.random() * 9 ) + 1;
  }
  return number;
}

/*This function generates either a one or two.*/
function oneOrTwo() {
  var num = Math.floor( Math.random() * 2 ) + 1;
  return num;
}

/*This function generates a bunch of random letters*/
function ranLetters(amount) {
  let array = []
  for ( i = 0; i < amount; i ++ ) {
    var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s",
        "t", "u", "v", "w", "x", "y", "z"]; /*Generate the alphabet*/
    var number = Math.floor( Math.random() * 26 );
    array += alphabet[number];
  }
  return array;
}

function genLetters(amount, capitals) {
  console.log('function fired');
  let lets = [];
  if (capitals === 0) {
    console.log('if1 fired');
    lets = ranLetters(amount);
  }
  else if (capitals === "doesn't matter") {
    //run one or two to capitalize letters or not
    console.log('else if fired');
    lets = ranLetters(amount);
    array = lets.split('');
    for ( let i = 0; i < amount; i++ ) {
      var num = oneOrTwo();
      console.log(num);
      if ( num == 1 ) {
        let capitalVersion = array[i].toUpperCase();
        console.log($.type(array));
        array.splice(i, 1, capitalVersion);
      }
      console.log(array);
      lets = array.join('');
    }
  }
  else {
    console.log('else fired');
    let lowerCaseQuantity = amount - capitals;
    console.log('lc quantity: ' + lowerCaseQuantity)
    let lowerCase = ranLetters(lowerCaseQuantity);
    var caps = ranLetters(capitals);
    lets = lowerCase + caps.toUpperCase();
  }
  return lets;
}

// const $amountOfCharactersVal = $amountOfCharacters.val();
// const $isLettersVal = $isLetters.val();
// const $amountOfLettersVal = $amountOfLetters.val();
// const $isCapitalsVal = $isCapitals.val();
// const $amountOfCapitalsVal = $amountOfCapitals.val();
// const $isNumbersVal = $isNumbers.val();
// const $amountOfNumbersVal = $amountOfNumbers.val();
// const $submitVal = $submit.val();

const $form = $('form');
const $amountOfCharacters = $('#amountOfCharacters');
const $isLetters = $('#isLetters');
const $amountOfLetters = $('#amountOfLetters');
const $isCapitals = $('#isCapitals');
const $isQuantityCapitals = $('#isQuantityCapitals');
const $amountOfCapitals = $('#amountOfCapitals');
const $isNumbers = $('#isNumbers');
const $amountOfNumbers = $('#amountOfNumbers');
const $submit = $('#submit');

//this takes away input when user doesn't want certain characters
$('.isIncluded').on('click', function() {
    if( $(this).prop('checked') ) {
        $(this).next().show();
    } else {
        $(this).next().hide();
    }
});

//work on the quantity of capitals mattering
//checks to see if the user wants to include certain
//characters then removes the number input field if they don't
function checkedMaybe() {
  $('.isIncluded').each(function(){
    if( $(this).prop('checked') ) {
        $(this).next().show();
    } else {
        $(this).next().hide();
    }
  });
}

checkedMaybe();

//when total inputed evenly distribute total amungst wanted types


$amountOfCharacters.on('change', function() {
  console.log( $(this).val() );
});


$form.submit( function(e) {
  e.preventDefault(); //prevents reload of page
  // eventhough only accepts numbers one still must parseInt the val()
  var totalQuantity = parseInt( $amountOfCharacters.val() );
  if ( $isLetters.prop('checked') ) {
    var lettersQuantity = parseInt( $amountOfLetters.val() );
  }
  else {
    var lettersQuantity = 0;
  }

  if ( $isCapitals.prop('checked') && $isQuantityCapitals.prop('checked') ) {
    var capitalsQuantity = parseInt( $amountOfCapitals.val() );
  }
  else if ( $isCapitals.prop('checked') ) {
    var capitalsQuantity = "doesn't matter";
  }
  else {
    var capitalsQuantity = 0;
  }

  if ( $isNumbers.prop('checked') ) {
  var numbersQuantity = parseInt( $amountOfNumbers.val() );
  }
  else {
    var numbersQuantity = 0;
  }

  var nums = ranNumbers(numbersQuantity);
  var lets = genLetters(lettersQuantity, capitalsQuantity);
  var password = nums + lets;

  console.log('capitals: '+ capitalsQuantity);
  console.log('letters: '+ lettersQuantity);
  console.log('numbers: '+ numbersQuantity);
  console.log(password);

});
