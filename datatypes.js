
/*

Based on How data stored in the memory and accessed its divided into 2 types

1. Primitive datatypes (These are reference by value)
    String
    Number
    BigInt
    Boolean
    null - it represent empty
    undefined - when memory and variable is defined but no value is assigned to it
    Symbol - it is a unique and immutable datatype


2. Reference (Non Primitive) (These are reference by address)
    Array 
    Objects
    Functions


Note:
Js is a dynamically typed language as we never define the type of the varaible 
when we assign value to it

*/


"use strict" // treat all js code in new version(with new standard)

// it works in browser and gives a popup but as we are using nodejs its has different syntax here
// alert(3+3) 

let name = "nitish"    // string
let age = 20           // integer (2 to the power of 53), beyond this we also have big int
let isLoggedIn = false // boolean
let state = null       // null is a standalone value which represents nothing, its an object type
let validstate;        // validstate value is not defined so 'undefined' is it current value, its a type

// symbol -> used for uniquenss specially when we have many elements in react and want them to be unique from each other
// object

console.log(typeof null)
console.log(typeof undefined)


// All though both look same but symbol returns diffrent value for both and 
// they are not equal though input is same in both. 
let id = Symbol("123")
let anotherid = Symbol("123")
console.log(id === anotherid)



// Datatype of all these Non primitives is Object
// Array
const myArr = ["1", "2", "3"]

// Object
let myObj = {
    name: "shobhit",
    age: 24
}

// Its datatype give function but its actually called object function
// Function (can be stored in a variable)
let myFunc = function(){
    console.log("Hello world")
}

console.log(typeof myArr)
console.log(typeof myObj)
console.log(typeof myFunc)
