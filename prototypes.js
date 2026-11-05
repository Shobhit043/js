// ==========================================
// JAVASCRIPT PROTOTYPES
// ==========================================

// 1. Add a method to a built-in prototype
Array.prototype.first = function () {
    return this[0]; // `this` refers to the calling array
};

const numbers = [10, 20, 30];
console.log(numbers.first()); // 10


// 2. Add a property to a prototype
Array.prototype.description = "An array";

console.log(numbers.description); // An array

// All arrays inherit this property.
// Avoid modifying built-in prototypes in production.


// 3. Add methods to a constructor's prototype
function User(name) {
    this.name = name; // Own property of each instance
}

// Shared method: created only once
User.prototype.greet = function () {
    return `Hello, ${this.name}`;
};

const user1 = new User("John");
const user2 = new User("Alice");

console.log(user1.greet()); // Hello, John
console.log(user1.greet === user2.greet); // true (shared method)


// 4. Add a property/method dynamically
User.prototype.role = "Member";

console.log(user1.role); // Member
console.log(user2.role); // Member


// 5. Getters and setters on a prototype
Object.defineProperty(User.prototype, "info", {
    get() {
        return `Name: ${this.name}`;
    },
    set(value) {
        this.name = value;
    }
});

console.log(user1.info); // Name: John (getter)
user1.info = "David";    // Calls setter
console.log(user1.name); // David


// 6. ES6 classes: methods automatically go on the prototype
class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        console.log(`${this.name} makes a sound`);
    }
}

const animal = new Animal("Dog");
animal.speak();

// Equivalent to:
// Animal.prototype.speak = function () { ... };


// 7. Inheritance using prototypes
class Dog extends Animal {
    bark() {
        console.log("Woof!");
    }
}

const dog = new Dog("Tommy");

dog.speak(); // Inherited from Animal
dog.bark();  // Defined in Dog

// Dog.prototype inherits from Animal.prototype
console.log(
    Object.getPrototypeOf(Dog.prototype) === Animal.prototype
); // true


// 8. Create an object with a specified prototype
const parent = {
    greet() {
        console.log("Hello from parent");
    }
};

const child = Object.create(parent);

child.name = "John";
child.greet(); // Inherited method

console.log(Object.getPrototypeOf(child) === parent); // true


// 9. Inspect own vs inherited properties
console.log(child.hasOwnProperty("name"));  // true
console.log(child.hasOwnProperty("greet")); // false
console.log("greet" in child);              // true

// hasOwnProperty() checks own properties only.
// `in` checks both own and inherited properties.


// ==========================================
// IMPORTANT NOTES
// ==========================================

// ConstructorName.prototype -> prototype shared by instances
// Object.getPrototypeOf(obj) -> gets an object's prototype
// Object.setPrototypeOf(obj, proto) -> changes its prototype
// Object.create(proto) -> creates an object inheriting from proto
// `this` -> refers to the object calling the method

// Own properties belong to individual objects.
// Prototype properties/methods are inherited and shared.

// Avoid modifying built-in prototypes (Array, Object, etc.)
// in production because it can cause naming conflicts.
