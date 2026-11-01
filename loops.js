/*
=================================================
            JAVASCRIPT LOOPS
=================================================

Loops are used to execute a block of code repeatedly.

Main types:
1. for loop
2. while loop
3. do...while loop
4. for...of loop
5. for...in loop

Loop control statements:
- break
- continue
*/


// ================================================
// 1. FOR LOOP
// ================================================

/*
Syntax:

for (initialization; condition; update) {
    // code
}

Flow:
1. Initialize variable
2. Check condition
3. Execute code
4. Update variable
5. Repeat from step 2
*/

console.log("----- FOR LOOP -----");

for (let i = 1; i <= 5; i++) {
    console.log(i);
}

/*
Output:
1
2
3
4
5
*/


// ================================================
// 2. FOR LOOP - DECREMENT
// ================================================

console.log("----- FOR LOOP (DECREMENT) -----");

for (let i = 5; i >= 1; i--) {
    console.log(i);
}


// ================================================
// 3. NESTED FOR LOOP
// ================================================

/*
A loop inside another loop.
*/

console.log("----- NESTED LOOP -----");

for (let i = 1; i <= 3; i++) {
    for (let j = 1; j <= 2; j++) {
        console.log(`i = ${i}, j = ${j}`);
    }
}


// ================================================
// 4. WHILE LOOP
// ================================================

/*
Syntax:

while (condition) {
    // code
}

The condition is checked BEFORE executing the code.
*/

console.log("----- WHILE LOOP -----");

let count = 1;

while (count <= 5) {
    console.log(count);
    count++;
}


// ================================================
// 5. DO...WHILE LOOP
// ================================================

/*
Syntax:

do {
    // code
} while (condition);

Important:
The code executes AT LEAST ONCE,
even if the condition is false.
*/

console.log("----- DO WHILE LOOP -----");

let num = 1;

do {
    console.log(num);
    num++;
} while (num <= 5);


// Example where condition is false initially

let x = 10;

do {
    console.log("This executes once");
} while (x < 5);


// ================================================
// 6. FOR...OF LOOP
// ================================================

/*
Used to iterate over VALUES of iterable objects.

Commonly used with:
- Arrays
- Strings
- Sets
- Maps
*/

console.log("----- FOR...OF ARRAY -----");

const fruits = ["Apple", "Banana", "Mango"];

for (const fruit of fruits) {
    console.log(fruit);
}


// FOR...OF with String

console.log("----- FOR...OF STRING -----");

const name = "JavaScript";

for (const character of name) {
    console.log(character);
}


// ================================================
// 7. FOR...IN LOOP
// ================================================

/*
Used to iterate over KEYS/PROPERTIES of an object.
*/

console.log("----- FOR...IN OBJECT -----");

const user = {
    name: "Shobhit",
    age: 25,
    city: "Delhi"
};

for (const key in user) {
    console.log(key, ":", user[key]);
}

/*
Output:
name : Shobhit
age : 25
city : Delhi
*/

// ================================================
// 8. BREAK
// ================================================

/*
break immediately terminates the loop.
*/

console.log("----- BREAK -----");

for (let i = 1; i <= 10; i++) {
    if (i === 5) {
        break;
    }

    console.log(i);
}

/*
Output:
1
2
3
4
*/


// ================================================
// 9. CONTINUE
// ================================================

/*
continue skips the current iteration
and moves to the next iteration.
*/

console.log("----- CONTINUE -----");

for (let i = 1; i <= 5; i++) {
    if (i === 3) {
        continue;
    }

    console.log(i);
}

/*
Output:
1
2
4
5
*/


// ================================================
// 10. INFINITE LOOP
// ================================================

/*
Be careful!

This loop never stops because the condition
always remains true.

while (true) {
    console.log("Infinite loop");
}

Do not run this unless you intentionally
want an infinite loop.
*/


// ================================================
// 11. ARRAY LOOP USING INDEX
// ================================================

console.log("----- ARRAY WITH INDEX -----");

const numbers = [10, 20, 30, 40];

for (let i = 0; i < numbers.length; i++) {
    console.log(
        "Index:", i,
        "Value:", numbers[i]
    );
}


// ================================================
// 12. SUMMARY
// ================================================

/*
for
→ Use when you know roughly how many times
  you want to repeat.

while
→ Use when repetition depends on a condition.

do...while
→ Use when the code must execute at least once.

for...of
→ Use to get VALUES from arrays, strings, Sets, etc.

for...in
→ Use to get KEYS/PROPERTIES from objects.

break
→ Completely stops the loop.

continue
→ Skips the current iteration.
*/
