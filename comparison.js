// works as expected
// console.log(1 == 2)
// console.log(1 > 2)
// console.log(1 < 2)
// console.log(1 >= 2)
// console.log(1 <= 2)

// problem comes when we compare 2 values of different datatype
// Note: Its a good practice to make sure before comparison that both values are of same datatype

// here both return true
// console.log("2">1)
// console.log("02">1)

// here first 2 returns false but 3rd return true
/*
    This happens because comparison signs and equality signs behave differently while comparing
    comparison operators converts null to int which is 0 due to which this wierd behaviour arises
    while equality does not chnage and returns false
*/
// console.log(null > 0)
// console.log(null == 0)
// console.log(null >= 0)


// All 3 returns false
// console.log(undefined == 0)
// console.log(undefined > 0)
// console.log(undefined < 0)


/*
    All of these comparison behaviour is good to know from exam point of view but during production code
    Its it a good practice to do type check before doing comparison and strick conversion should be use
*/

// strict check
// this does not do type conversion during comparison
// ===
console.log("2" === 2)