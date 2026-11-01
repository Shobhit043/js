/*

    Primitive - Stack (By value)
    string, number, bigint, null, undefined, symbol
    (These values are immutable, these values are copied by value)

    Reference - Heap (By address)
    object, array, function, date, map, set
*/


let yt_name = "shobhit"
let yt_name2 = yt_name // copy by value
yt_name = "Harsh"
console.log(yt_name)
console.log(yt_name2)


let myobj = {
    name: "shobhit",
    num: 12
}
let myobj2 = myobj // copy by reference
myobj.name = "harsh"
console.log(myobj)
console.log(myobj2)


