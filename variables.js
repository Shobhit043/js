const accountId = 1234
// accountId = 12345   // this is not allowed as its constant
// console.log(accountId)

let accountName = "shobhit"

// This should never be used because of issue in block scope and functional scope
var accountEmail = "shobhit@gmail.com"

// js is so type safe that even this is allowed but should always be avoided 
accountCity = "gurugram" 

// if no value is assigned then variable value is underfined
let accountState; 

accountName = "raj"
accountEmail = "raj@gmail.com"
accountCity = "delhi"

console.table([accountId, accountName, accountEmail, accountCity, accountState])
