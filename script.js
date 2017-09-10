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
  let lets = [];
  if (capitals === 0) {
    lets = ranLetters(amount);
  }
  else if (capitals === "doesn't matter") {
    //run one or two to capitalize letters or not
    lets = ranLetters(amount);
    array = lets.split('');
    for ( let i = 0; i < amount; i++ ) {
      var num = oneOrTwo();
      if ( num == 1 ) {
        let capitalVersion = array[i].toUpperCase();
        array.splice(i, 1, capitalVersion);
      }
      lets = array.join('');
    }
  }
  else {
    let lowerCaseQuantity = amount - capitals;
    let lowerCase = ranLetters(lowerCaseQuantity);
    var caps = ranLetters(capitals);
    lets = lowerCase + caps.toUpperCase();
  }
  return lets;
}

//divides the total between the numbers and letters
function distributeTotal() {
  let nums = $amountOfCharacters.val() / 2;
  let lets = $amountOfCharacters.val() / 2;
  nums = Math.floor(nums);
  lets = Math.ceil(lets);
  $amountOfLetters.val(lets);
  $amountOfNumbers.val(nums);
}

//this function randomizes the order of a string
function shuffle(string) {
  a = string.split('');
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  password = a.join('');
  return password;
}

function correctForCapitals() {
  if( $isCapitals.prop('checked') ) {
    $amountOfCapitals.val( Math.floor( $amountOfLetters.val() / 3 ) );
  }
}

function correctTotal() {
  if( $amountOfLetters.val() < 0 ) {
    $amountOfCharacters.val( $amountOfNumbers.val() );
    $amountOfLetters.val(0);
  }
  if( $amountOfNumbers.val() < 0 ) {
    $amountOfCharacters.val( $amountOfLetters.val() );
    $amountOfNumbers.val(0);
  }
}

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

//this takes away input when user doesn't want certain characters
$('.isIncluded').on('change', function() {
    if( $(this).prop('checked') ) {
      if( $(this).prop("id") == "isCapitals" ) {
        //if the user doesn't want capitals there is no reason to ask
        //how many capitals they want or whether it matters
        $(this).next().next().show();
        if( $(this).next().next().prop('checked') ) {
          $(this).next().next().next().show();
        }
      }
        $(this).next().show();
    } else {
      if( $(this).prop("id") == "isCapitals" ) {
        $(this).next().next().hide();
        $(this).next().next().next().hide();
      }
        $(this).next().hide();
    }
    if( $isLetters.prop('checked') && $isNumbers.prop('checked') ) {
      distributeTotal();
    } else if ( $isLetters.prop('checked') ) {
      $amountOfLetters.val( $amountOfCharacters.val() );
    } else if ( $isNumbers.prop('checked') ) {
      $amountOfNumbers.val( $amountOfCharacters.val() );
    }
});

checkedMaybe(); //runs at beginning to eliminate unwanted input fields

//when total inputed evenly distribute total amungst wanted types
$amountOfCharacters.on('change', function() {
  console.log( $(this).val() );
  if( $isLetters.prop('checked') && $isNumbers.prop('checked') ) {
    //total divided between numbers and letters and
    //if capitals checked then some will be capitals
    let nums = $amountOfCharacters.val() / 2;
    let lets = $amountOfCharacters.val() / 2;
    nums = Math.floor(nums);
    lets = Math.ceil(lets);
    $amountOfLetters.val(lets);
    $amountOfNumbers.val(nums);
    console.log( "numbers: " + nums + "    letters: " + lets )
  } else if ( $isLetters.prop('checked') ) {
    //letters will be total and if capitals checked some will be capitals
    $amountOfLetters.val( $(this).val() )
  } else if ( $isNumbers.prop('checked') ) {
    //numbers will become total
    $amountOfNumbers.val( $(this).val() )
  }
  //deal with the capitals here
  correctForCapitals();
  correctTotal();
});

$amountOfLetters.on('change', function() {
  //numbers = Totals - Letters
  if( $isNumbers.prop('checked') ) {
    $amountOfNumbers.val( $amountOfCharacters.val() - $(this).val() );
  }
  correctForCapitals();
  correctTotal();
});

$amountOfNumbers.on('change', function() {
  //Letters = Total - Numbers
  if( $isLetters.prop('checked') ) {
    $amountOfLetters.val( $amountOfCharacters.val() - $(this).val() );
  }
  correctForCapitals();
  correctTotal()
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
  password = shuffle(password);
  console.log('capitals: '+ capitalsQuantity);
  console.log('letters: '+ lettersQuantity);
  console.log('numbers: '+ numbersQuantity);
  console.log(password);
});
