# Password-Generator
Password generator with some minor options

current issues:
1. When does it matter how many capitals is not checked and
    the capitals checkmark is unchecked then checked "does it matter" number input shows up again.
      Solution: quick if statement
      SOLVED!!!!!!!!

2. When it matters how many capitals are in the password the capitals are put at the end and not in random order.
  Solution: after password generated shuffle the characters before being spit out.
  SOLVED!!!!!!

3. Letters and numbers are not mixed at all.
  Solution: after password generated shuffle the characters before being spit out.
  SOLVED!!!!!!!

4. Total needs to be factored into the program. When total set the other fields should reflect that. and when other fields are changed the total and other field should reflect that as well.
Solution: Expand the .on('change, function')
SOLVED!!!!!!

5. styling looks terrible but slowly fixing it.

6. When numbers or letters unchecked the other should become equal to the total and then reverse the action when rechecked.
Solution: expand the .on('change') callback function.
SOLVED!!!!!!
