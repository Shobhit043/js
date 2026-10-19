//var c = 300
let a = 300
if (true) {
    let a = 10
    const b = 20
    // console.log("INNER: ", a);
    
}



// console.log(a);
// console.log(b);
// console.log(c);


function one(){
    const username = "hitesh"

    function two(){
        const website = "youtube"
        console.log(username);
    }
    // console.log(website);

     two()

}

// one()

if (true) {
    const username = "hitesh"
    if (username === "hitesh") {
        const website = " youtube"
        // console.log(username + website);
    }
    // console.log(website); // not in scope
}

// console.log(username); // not in scope


// ++++++++++++++++++ interesting ++++++++++++++++++

// this works as function addone is defined in different way
console.log(addone(5))

function addone(num){
    return num + 1
}


// gives error, as function is called before declaration(funciton hoisting problem)
addTwo(5)
const addTwo = function(num){
    return num + 2
}