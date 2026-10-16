function print(val, cval){
    console.log("Original type = ", typeof val)
    console.log("Converted type = ", typeof cval)
    console.log("Converted value = ", cval, "\n")
}

print("33", Number("33"))
print("33abc", Number("33abc")) // gets converted to NaN, but still classified as a number
print("abc", Number("abc")) // gets converted to NaN, but still classified as a number
print(null, Number(null)) // gets converted to 0
print(undefined, Number(undefined)) // gets converted to NaN
print(true, Number(true)) // gets converted to 1
print(1, Boolean(1)) // gets converted to true
print(2,Boolean(2)) // gets converted to true
print(0,Boolean(0)) // gets converted to false
print("",Boolean("")) // gets converted to false
print("shobhit", Boolean("shobhit")) // gets converted to false
print(33, String(33)) // gets converted to string



