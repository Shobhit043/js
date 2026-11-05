class User {
    constructor(name, age) {
        this.name = name;
        this._age = age;
    }

    // Getter: runs when reading user.age
    get age() {
        return this._age;
    }

    // Setter: runs when assigning user.age
    set age(value) {
        if (value < 0) {
            throw new Error("Age cannot be negative");
        }

        this._age = value;
    }
}

const user = new User("John", 25);

// Calls getter
console.log(user.age); // 25

// Calls setter
user.age = 30;

console.log(user.age); // 30

// Throws an error
user.age = -5;
