// Immediately Invoked Function Expressions (IIFE)


(function chai(){
    // named IIFE
    console.log(`DB CONNECTED`);
})();
// must close using semi-colon as it doesnot know where to stop the execution

( (name) => {
    console.log(`DB CONNECTED TWO ${name}`);
} )('hitesh')
