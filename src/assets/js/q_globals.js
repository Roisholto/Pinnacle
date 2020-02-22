// module to common variables used all around

// https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
// password matching Minimum eight characters, at least one letter and one number

/* const validatePassword = (password)=> {
    if (password.length < 8)
        return false

    var lower = false
    var upper = false
    var numbers = false
    var special = false

    password.forEach( (c)=>{
        if (c.isDigit)
            numbers = true
        else if (c.strtoLower)
            lower = true
        else if (c.isUpper)
            upper = true
        else
            special = true
        })

  lower && upper && numbers && special
} */

export const validatePassword = (str) => {
  if (str.length < 8) { return false }

  let lower = false
  let upper = false
  let numbers = false
  let special = false
  let invalids = false
  let rt
  let character

  for (let i = 0; i < str.length; i++) {
    // remove empty spaces

    character = str[i].trim().charAt()

    if (character.length > 0) {
      if (!isNaN(character * 1)) {
        // console.log('character is numeric');
        numbers = true
      } else {
        // test if it is special character
        if (character == character.toLowerCase() && character == character.toUpperCase()) {
          // console.log('special')
          special = true
        } else if (character == character.toUpperCase()) {
          // console.log('upper case true')
          upper = true
        } else (character == character.toLowerCase())
        {
          // console.log('lower case true');
          lower = true
        }
      }
    } else {
      invalids = true
    }
  }

  // minimum letters and numbers

  rt = (((lower || upper) || (lower || upper || special)) && (numbers && !invalids))

  // mimnimum upper and lower and numbers
  // rt = lower && upper && numbers XOR special && ! invalids ;
  // minimum upper, lower and special characters
  // rt =  lower &&  upper && numbers && special && ! invalids ;
  return rt
}
