// Immediately Invoked Function Expressions (IIFE)


(function chai(name){
    // named IIFE
    console.log(name)
    console.log(`DB CONNECTED`);
})("Hitesh");
// must close using semi-colon as it doesnot know where to stop the execution

( (name) => {
    console.log(`DB CONNECTED TWO ${name}`);
} )('hitesh')
