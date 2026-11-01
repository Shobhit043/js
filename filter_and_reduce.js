
// ==========================================
// JavaScript Array Methods: map(), filter(), reduce()
// ==========================================

// Original array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];


// ==========================================
// 1. FILTER()
// Returns a new array containing elements
// that satisfy the given condition.
// ==========================================

// Example 1: Get even numbers
const evenNumbers = numbers.filter(num => num % 2 === 0);
console.log("Even numbers:", evenNumbers);

// Example 2: Get numbers greater than 5
const greaterThanFive = numbers.filter(num => num > 5);
console.log("Greater than 5:", greaterThanFive);

// Example 3: Filter objects
const users = [
    { name: "Alice", age: 25 },
    { name: "Bob", age: 17 },
    { name: "Charlie", age: 30 },
    { name: "David", age: 15 }
];

const adults = users.filter(user => user.age >= 18);
console.log("Adults:", adults);


// ==========================================
// 2. REDUCE()
// Accumulates array elements into a single
// value (or another data structure).
// ==========================================

// Example 1: Calculate sum
const sum = numbers.reduce((acc, curr) => {
    return acc + curr;
}, 0);

console.log("Sum:", sum);

// Example 2: Calculate product
const product = numbers.reduce((acc, curr) => {
    return acc * curr;
}, 1);

console.log("Product:", product);

// Example 3: Find maximum number
const max = numbers.reduce((acc, curr) => {
    return acc > curr ? acc : curr;
}, numbers[0]);

console.log("Maximum:", max);

// Example 4: Count occurrences
const fruits = ["apple", "banana", "apple", "orange", "banana", "apple"];

const fruitCount = fruits.reduce((acc, fruit) => {
    acc[fruit] = (acc[fruit] || 0) + 1;
    return acc;
}, {});

console.log("Fruit count:", fruitCount);


// ==========================================
// 3. COMBINING FILTER() AND REDUCE()
// ==========================================

// Calculate sum of even numbers
const evenSum = numbers
    .filter(num => num % 2 === 0)
    .reduce((acc, curr) => acc + curr, 0);

console.log("Sum of even numbers:", evenSum);


// ==========================================
// 4. MAP()
// Transforms each element and returns
// a new array.
// ==========================================

// Multiply every number by 2
const doubled = numbers.map(num => num * 2);
console.log("Doubled:", doubled);


// ==========================================
// 5. PRACTICE QUESTIONS
// ==========================================

// Q1: Filter numbers greater than 20.
// Q2: Calculate the sum of all numbers.
// Q3: Find the maximum number.
// Q4: Count the occurrences of each element.
// Q5: Filter even numbers and multiply them by 10.
// Q6: Calculate the sum of odd numbers.

// ==========================================
// END
// ==========================================

