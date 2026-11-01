
// ============================================================
// JAVASCRIPT ASYNCHRONOUS PROGRAMMING - REFERENCE NOTES
// ============================================================


// ============================================================
// 1. SYNCHRONOUS JAVASCRIPT
// ============================================================

/*
Synchronous means code executes one statement at a time.

Each statement waits for the previous statement to finish.

Example:
*/

console.log("First");

console.log("Second");

console.log("Third");

/*
OUTPUT:

First
Second
Third


IMPORTANT:
JavaScript is traditionally single-threaded.

It executes JavaScript code using a call stack.
A synchronous operation blocks further execution
until that operation finishes.
*/


// ============================================================
// 2. ASYNCHRONOUS JAVASCRIPT
// ============================================================

/*
Asynchronous means an operation can be started without
making the entire program wait for that operation to finish.

Examples:
- Fetching data from an API.
- Reading files.
- Timers.
- Database operations.
- Network requests.

JavaScript can continue executing other code while
an asynchronous operation is pending.
*/

console.log("Start");

setTimeout(() => {
    console.log("Inside timeout");
}, 2000);

console.log("End");

/*
OUTPUT:

Start
End
Inside timeout

WHY?

1. Start is printed.
2. setTimeout schedules a callback.
3. JavaScript continues executing.
4. End is printed.
5. After approximately 2 seconds, the callback becomes
   eligible to execute.

IMPORTANT:
setTimeout does not block the main thread.
*/


// ============================================================
// 3. HOW ASYNCHRONOUS JAVASCRIPT WORKS
// ============================================================

/*
IMPORTANT COMPONENTS:

1. CALL STACK
   Executes synchronous JavaScript functions.

2. WEB APIs / RUNTIME APIs
   Browser provides facilities such as:
   - setTimeout()
   - DOM events
   - fetch()

   Node.js provides its own runtime APIs.

3. CALLBACK QUEUE (TASK QUEUE)
   Stores callbacks from tasks such as timers and DOM events.

4. MICROTASK QUEUE
   Stores Promise callbacks and other microtasks.

5. EVENT LOOP
   Coordinates execution between the call stack and queues.

EXECUTION FLOW:

JavaScript code
      |
      v
  Call Stack
      |
      v
Async operation delegated to runtime
      |
      v
Callback becomes ready
      |
      +------> Microtask Queue (Promises)
      |
      +------> Task Queue (Timers, events)
      |
      v
Event Loop checks whether call stack is empty
      |
      v
Callback gets executed

IMPORTANT:
Microtasks are processed before the next task is taken
from the task queue, after the current synchronous
execution completes.
*/


// ============================================================
// 4. CALLBACK FUNCTIONS
// ============================================================

/*
A callback is a function passed as an argument to
another function.

It can be executed immediately or later.

Callbacks are commonly used in asynchronous programming.
*/

function greet(name, callback) {

    console.log("Hello " + name);

    callback();

}

function sayBye() {
    console.log("Goodbye");
}

greet("John", sayBye);

/*
OUTPUT:

Hello John
Goodbye
*/


// ASYNCHRONOUS CALLBACK EXAMPLE

function fetchData(callback) {

    setTimeout(() => {

        const data = "User data received";

        callback(data);

    }, 2000);

}

fetchData((result) => {
    console.log(result);
});

/*
The callback executes after the simulated operation finishes.
*/


// ============================================================
// 5. CALLBACK HELL
// ============================================================

/*
Callback hell happens when multiple asynchronous operations
depend on each other and callbacks become deeply nested.

It makes code:
- Difficult to read.
- Difficult to maintain.
- Difficult to handle errors.
*/

function getUser(callback) {

    setTimeout(() => {

        console.log("User received");

        callback();

    }, 1000);

}

function getOrders(callback) {

    setTimeout(() => {

        console.log("Orders received");

        callback();

    }, 1000);

}

function getPayment(callback) {

    setTimeout(() => {

        console.log("Payment received");

        callback();

    }, 1000);

}

getUser(() => {

    getOrders(() => {

        getPayment(() => {

            console.log("All operations completed");

        });

    });

});


/*
This is an example of callback nesting.

Promises and async/await help avoid this problem.
*/


// ============================================================
// 6. PROMISES
// ============================================================

/*
A Promise is an object representing the eventual
completion or failure of an asynchronous operation.

A Promise has THREE states:

1. PENDING
   Operation is still in progress.

2. FULFILLED
   Operation completed successfully.

3. REJECTED
   Operation failed.

IMPORTANT:
A settled Promise cannot change its state again.
*/

// Creating a Promise

const myPromise = new Promise((resolve, reject) => {

    const success = true;

    if (success) {

        resolve("Operation successful");

    } else {

        reject("Operation failed");

    }

});


/*
resolve()  -> Fulfills the Promise.
reject()   -> Rejects the Promise.
*/


// ============================================================
// 7. .then() METHOD
// ============================================================

/*
.then() handles the fulfilled value of a Promise.

Syntax:

promise.then(onFulfilled, onRejected);
*/

myPromise.then((result) => {

    console.log(result);

});

/*
OUTPUT:

Operation successful
*/


// ============================================================
// 8. .catch() METHOD
// ============================================================

/*
.catch() handles Promise rejections.

It is useful for handling asynchronous errors.
*/

const failedPromise = new Promise((resolve, reject) => {

    reject("Something went wrong");

});

failedPromise
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    });

/*
OUTPUT:

Something went wrong
*/


// ============================================================
// 9. .finally() METHOD
// ============================================================

/*
.finally() executes after a Promise settles.

It runs whether the Promise is fulfilled or rejected.

Useful for:
- Hiding loading indicators.
- Cleaning up resources.
- Resetting UI state.
*/

Promise.resolve("Success")
    .then((result) => {

        console.log(result);

    })
    .catch((error) => {

        console.log(error);

    })
    .finally(() => {

        console.log("Operation completed");

    });


// ============================================================
// 10. PROMISE CHAINING
// ============================================================

/*
Promise chaining means connecting multiple .then() calls.

Each .then() returns a new Promise.

The value returned from one .then() is passed to
the next .then().
*/

Promise.resolve(10)

    .then((num) => {

        console.log(num);

        return num * 2;

    })

    .then((num) => {

        console.log(num);

        return num + 5;

    })

    .then((num) => {

        console.log(num);

    });

/*
OUTPUT:

10
20
25

IMPORTANT:
Always return a value if the next .then() needs it.
*/


// ============================================================
// 11. RETURNING A PROMISE INSIDE .then()
// ============================================================

function getUserData() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve({
                id: 1,
                name: "John"
            });

        }, 1000);

    });

}

getUserData()
    .then((user) => {

        console.log(user);

        return user.id;

    })
    .then((id) => {

        console.log("User ID:", id);

    });

/*
The next .then() waits for the Promise returned by
the previous .then() to settle.

This allows sequential asynchronous operations.
*/


// ============================================================
// 12. ASYNC FUNCTION
// ============================================================

/*
The async keyword is used to declare an asynchronous function.

An async function ALWAYS returns a Promise.

Even if you return a normal value, JavaScript wraps it
in a fulfilled Promise.
*/

async function greetUser() {

    return "Hello";

}

console.log(greetUser());

/*
The result is a Promise fulfilled with "Hello".

Equivalent conceptually to:

function greetUser() {
    return Promise.resolve("Hello");
}
*/


// ============================================================
// 13. AWAIT KEYWORD
// ============================================================

/*
await is used inside async functions (or at supported
top-level module contexts).

It pauses the execution of the surrounding async function
until the Promise settles.

It does NOT block the entire JavaScript thread.

After fulfillment, await returns the fulfilled value.

If the Promise rejects, await throws the rejection reason.
*/

function getData() {

    return new Promise((resolve) => {

        setTimeout(() => {

            resolve("Data received");

        }, 2000);

    });

}

async function displayData() {

    console.log("Before await");

    const result = await getData();

    console.log(result);

    console.log("After await");

}

displayData();

/*
OUTPUT:

Before await
(approximately 2 seconds later)
Data received
After await

IMPORTANT:
Other JavaScript code can execute while the async function
is waiting for the Promise.
*/


// ============================================================
// 14. ASYNC/AWAIT WITH ERROR HANDLING
// ============================================================

/*
try/catch is used to handle errors from awaited Promises.

A rejected Promise causes await to throw an error.
*/

function fetchUser() {

    return new Promise((resolve, reject) => {

        reject(new Error("Unable to fetch user"));

    });

}

async function displayUser() {

    try {

        const user = await fetchUser();

        console.log(user);

    } catch (error) {

        console.log("Error:", error.message);

    } finally {

        console.log("Request completed");

    }

}

displayUser();


// ============================================================
// 15. SEQUENTIAL ASYNCHRONOUS EXECUTION
// ============================================================

/*
When one operation depends on the result of another,
execute them sequentially using await.
*/

function getUser() {

    return Promise.resolve("User received");

}

function getOrders() {

    return Promise.resolve("Orders received");

}

async function processData() {

    const user = await getUser();

    console.log(user);

    const orders = await getOrders();

    console.log(orders);

}

processData();

/*
Execution:

1. getUser() executes.
2. JavaScript waits for its Promise to settle.
3. User result is received.
4. getOrders() executes.
5. Orders result is received.

IMPORTANT:
Sequential execution is appropriate when operations
depend on one another.
*/


// ============================================================
// 16. PARALLEL EXECUTION WITH PROMISE.ALL()
// ============================================================

/*
Promise.all() accepts an iterable of Promises.

It fulfills when ALL input Promises fulfill.

If ANY input Promise rejects, Promise.all() rejects.

It returns results in the SAME ORDER as the input Promises,
not necessarily the order in which they finish.
*/

const promise1 = Promise.resolve("One");
const promise2 = Promise.resolve("Two");
const promise3 = Promise.resolve("Three");

Promise.all([promise1, promise2, promise3])

    .then((results) => {

        console.log(results);

    });

/*
OUTPUT:

["One", "Two", "Three"]
*/


// ============================================================
// 17. PROMISE.ALL() WITH ASYNC/AWAIT
// ============================================================

async function fetchAllData() {

    const results = await Promise.all([

        getUser(),
        getOrders(),
        getPayment()

    ]);

    console.log(results);

}

// fetchAllData();


/*
IMPORTANT:

Promise.all() allows independent asynchronous operations
to run concurrently.

Compare:

Sequential:

const a = await getA();
const b = await getB();

Concurrent:

const [a, b] = await Promise.all([
    getA(),
    getB()
]);

Use Promise.all() when operations do not depend on
each other's results.
*/


// ============================================================
// 18. PROMISE.ALLSETTLED()
// ============================================================

/*
Promise.allSettled() waits for ALL Promises to settle.

Unlike Promise.all(), it does not reject just because
one of the input Promises rejects.

It returns the status and result/reason of every Promise.
*/

const p1 = Promise.resolve("Success");

const p2 = Promise.reject("Failed");

const p3 = Promise.resolve("Completed");

Promise.allSettled([p1, p2, p3])

    .then((results) => {

        console.log(results);

    });

/*
OUTPUT:

[
    { status: "fulfilled", value: "Success" },
    { status: "rejected", reason: "Failed" },
    { status: "fulfilled", value: "Completed" }
]
*/


// ============================================================
// 19. PROMISE.RACE()
// ============================================================

/*
Promise.race() settles as soon as the first input Promise
settles.

The first one can either fulfill OR reject.
*/

const race1 = new Promise((resolve) => {

    setTimeout(() => resolve("First"), 1000);

});

const race2 = new Promise((resolve) => {

    setTimeout(() => resolve("Second"), 2000);

});

Promise.race([race1, race2])
    .then((result) => {

        console.log(result);

    });

/*
OUTPUT:

First

The first Promise to settle determines the result.
*/


// ============================================================
// 20. PROMISE.ANY()
// ============================================================

/*
Promise.any() fulfills as soon as ANY input Promise fulfills.

Rejected Promises are ignored unless ALL input Promises
reject.

If all reject, it rejects with AggregateError.
*/

const any1 = Promise.reject("Error 1");

const any2 = Promise.resolve("Success");

const any3 = Promise.resolve("Another success");

Promise.any([any1, any2, any3])
    .then((result) => {

        console.log(result);

    });

/*
OUTPUT:

Success

The first fulfilled Promise determines the result.
*/


// ============================================================
// 21. FETCH API
// ============================================================

/*
fetch() is used to make HTTP requests.

It returns a Promise.

Common uses:
- Getting data from an API.
- Sending data to a server.
- Updating server resources.
- Deleting resources.

Basic syntax:

fetch(url)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
*/

fetch("https://jsonplaceholder.typicode.com/users/1")

    .then((response) => {

        // Check HTTP status because fetch does not reject
        // automatically for HTTP errors such as 404 or 500.

        if (!response.ok) {

            throw new Error("HTTP Error: " + response.status);

        }

        // Convert response body into JavaScript data.
        return response.json();

    })

    .then((data) => {

        console.log(data);

    })

    .catch((error) => {

        console.log(error.message);

    });


// ============================================================
// 22. FETCH WITH ASYNC/AWAIT
// ============================================================

async function fetchUserFromAPI() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        if (!response.ok) {

            throw new Error("HTTP Error: " + response.status);

        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Error:", error.message);

    }

}

// fetchUserFromAPI();


/*
IMPORTANT:

fetch() returns a Promise for the Response object.

response.json() ALSO returns a Promise.

Therefore, we await both operations.
*/


// ============================================================
// 23. HTTP METHODS WITH FETCH
// ============================================================


// GET: Retrieve data

async function getUsers() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);

}


// POST: Create data

async function createUser() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name: "John",
                email: "john@example.com"
            })
        }
    );

    if (!response.ok) {
        throw new Error("Request failed");
    }

    const data = await response.json();

    console.log(data);

}


/*
PUT    → Usually replaces a resource.
PATCH  → Partially updates a resource.
DELETE → Deletes a resource.

JSON.stringify():
Converts JavaScript data into JSON text.

response.json():
Parses JSON response text into JavaScript data.
*/


// ============================================================
// 24. MICROTASK QUEUE VS TASK QUEUE
// ============================================================

/*
MICROTASKS:
- Promise.then()
- Promise.catch()
- Promise.finally()
- queueMicrotask()

TASKS (MACROTASKS):
- setTimeout()
- setInterval()
- DOM events

After the current synchronous JavaScript execution,
the event loop processes microtasks before taking
the next task from the task queue.

Microtasks are also processed until the microtask queue
is empty.
*/

console.log("Start");

setTimeout(() => {

    console.log("Timeout");

}, 0);

Promise.resolve().then(() => {

    console.log("Promise");

});

console.log("End");

/*
OUTPUT:

Start
End
Promise
Timeout

WHY?

1. Start executes synchronously.
2. setTimeout schedules a task.
3. Promise.then schedules a microtask.
4. End executes synchronously.
5. Microtask queue is processed.
6. Timer callback executes when eligible.

IMPORTANT:
setTimeout(..., 0) does NOT mean immediate execution.
*/


// ============================================================
// 25. SETTIMEOUT()
// ============================================================

/*
setTimeout() executes a callback after a specified delay.

Syntax:

setTimeout(callback, delay);
*/

const timerId = setTimeout(() => {

    console.log("Executed after approximately 2 seconds");

}, 2000);


// Cancel a scheduled timeout.

clearTimeout(timerId);


// ============================================================
// 26. SETINTERVAL()
// ============================================================

/*
setInterval() repeatedly executes a callback
at approximately the specified interval.
*/

const intervalId = setInterval(() => {

    console.log("Repeated execution");

}, 1000);


// Stop the interval.

clearInterval(intervalId);


// ============================================================
// 27. ASYNC FUNCTIONS AND PROMISE RETURN VALUES
// ============================================================

async function calculate() {

    return 100;

}

calculate().then((result) => {

    console.log(result);

});

/*
Even though calculate() returns a normal number,
the async function returns a Promise.

Output:

100
*/


// ============================================================
// 28. AWAIT ONLY PAUSES THE SURROUNDING ASYNC FUNCTION
// ============================================================

function delay() {

    return new Promise((resolve) => {

        setTimeout(resolve, 2000);

    });

}

async function task() {

    console.log("Task started");

    await delay();

    console.log("Task completed");

}

console.log("Program started");

task();

console.log("Program continues");

/*
OUTPUT:

Program started
Task started
Program continues
(approximately 2 seconds later)
Task completed

IMPORTANT:

await pauses the surrounding async function.

It does NOT block the entire JavaScript thread.
*/


// ============================================================
// 29. TOP-LEVEL AWAIT
// ============================================================

/*
Top-level await allows await outside an async function
when using JavaScript modules.

Example in an ES module (.mjs or a module-enabled environment):

const response = await fetch("https://example.com");

const data = await response.text();

console.log(data);

IMPORTANT:
Top-level await is not generally available in
ordinary CommonJS scripts.
*/


// ============================================================
// 30. COMMON MISTAKES
// ============================================================

/*
1. Forgetting await:

   const data = fetch(url);

   data is a Promise, not the actual response data.


2. Forgetting to return inside .then():

   promise.then(() => {
       fetchData();
   });

   The next .then() will not wait for fetchData().

   Correct:

   promise.then(() => {
       return fetchData();
   });


3. Assuming fetch rejects on HTTP errors:

   fetch() generally rejects for network errors,
   not simply because the server returns 404 or 500.

   Check response.ok.


4. Using sequential await unnecessarily:

   const a = await getA();
   const b = await getB();

   If independent, Promise.all() can run them concurrently.


5. Forgetting error handling:

   Use .catch() or try/catch with await.


6. Thinking setTimeout(fn, 0) executes immediately:

   It schedules a task that executes when eligible.
*/


// ============================================================
// 31. QUICK REFERENCE
// ============================================================

/*

CALLBACK
--------
A function passed to another function.

PROMISE
-------
An object representing eventual success or failure.

THEN
----
Handles fulfillment and returns a new Promise.

CATCH
-----
Handles rejection and returns a new Promise.

FINALLY
-------
Runs after settlement, regardless of outcome.

ASYNC
-----
Declares a function that always returns a Promise.

AWAIT
-----
Waits for a Promise to settle inside an async function.

PROMISE.ALL()
-------------
Fulfills when all fulfill; rejects when one rejects.

PROMISE.ALLSETTLED()
--------------------
Waits for every Promise to settle.

PROMISE.RACE()
--------------
Settles with the first Promise to settle.

PROMISE.ANY()
-------------
Fulfills with the first fulfilled Promise.

FETCH()
-------
Makes HTTP requests and returns a Promise.

SETTIMEOUT()
------------
Schedules a callback after a delay.

SETINTERVAL()
-------------
Schedules repeated callback execution.

CLEAR_TIMEOUT()
---------------
Cancels a scheduled timeout.

CLEAR_INTERVAL()
----------------
Cancels a scheduled interval.

*/


// ============================================================
// 32. THINGS TO REMEMBER
// ============================================================

/*

1. JavaScript executes synchronous code using the call stack.

2. Asynchronous operations allow JavaScript to continue
   while an operation is pending.

3. JavaScript is single-threaded in its main execution
   context, but the runtime provides asynchronous APIs.

4. The event loop coordinates tasks and microtasks.

5. Promise callbacks are microtasks.

6. Timer callbacks are tasks.

7. Microtasks are processed before the next task.

8. An async function always returns a Promise.

9. await pauses only the surrounding async function.

10. Promise.all() is useful for independent operations.

11. Sequential await is useful when operations depend
    on previous results.

12. fetch() returns a Promise for a Response.

13. response.json() also returns a Promise.

14. fetch() does not automatically reject for HTTP
    error status codes.

15. Use try/catch for handling errors with async/await.

*/

