/**
 * JAVASCRIPT PROMISES
 * ============================================================
 *
 * A Promise represents the eventual result of an asynchronous
 * operation.
 *
 * Promise states:
 * 1. pending   - operation is still running
 * 2. fulfilled - operation completed successfully
 * 3. rejected  - operation failed
 *
 * A settled Promise (fulfilled or rejected) cannot change state.
 */

// ============================================================
// 1. CREATING A PROMISE
// ============================================================

/*
 * Promise constructor accepts an executor function.
 *
 * resolve(value) -> fulfills the Promise.
 * reject(error)  -> rejects the Promise.
 *
 * The executor runs immediately (synchronously).
 * Asynchronous work inside it may complete later.
 */

const myPromise = new Promise((resolve, reject) => {
    const success = true;

    setTimeout(() => {
        if (success) {
            resolve("Data loaded successfully");
        } else {
            reject(new Error("Something went wrong"));
        }
    }, 1000);
});

// ============================================================
// 2. THEN(), CATCH(), FINALLY()
// ============================================================

/*
 * then()    -> handles successful completion.
 * catch()   -> handles rejection/errors.
 * finally() -> executes regardless of success or failure.
 *
 * All three return a NEW Promise.
 */

myPromise
    .then((result) => {
        console.log("Success:", result);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    })
    .finally(() => {
        console.log("Operation completed");
    });


// ============================================================
// 3. PROMISE CHAINING
// ============================================================

/*
 * Each .then() returns a new Promise.
 *
 * The returned value becomes the input of the next .then().
 *
 * Returning another Promise makes the chain wait for it.
 *
 * Throwing an error rejects the next Promise.
 */

function getUser() {
    return Promise.resolve({ id: 1, name: "John" });
}

function getOrders(userId) {
    return Promise.resolve([
        { orderId: 101, userId },
        { orderId: 102, userId }
    ]);
}

getUser()
    .then((user) => {
        console.log("User:", user);

        // Return the Promise so the next step waits for it.
        return getOrders(user.id);
    })
    .then((orders) => {
        console.log("Orders:", orders);
        return orders.length;
    })
    .then((count) => {
        console.log("Total orders:", count);
    })
    .catch((error) => {
        console.log("Error:", error.message);
    });

/*
 * IMPORTANT:
 *
 * Incorrect:
 * .then((user) => {
 *     getOrders(user.id); // Missing return
 * })
 *
 * Correct:
 * .then((user) => {
 *     return getOrders(user.id);
 * })
 */


// ============================================================
// 4. ERROR PROPAGATION AND RECOVERY
// ============================================================

/*
 * If an error is thrown inside .then(), the next Promise
 * becomes rejected.
 *
 * catch() handles the rejection.
 *
 * Returning a normal value from catch() recovers the chain.
 */

Promise.resolve("Starting")
    .then((value) => {
        console.log(value);
        throw new Error("Something failed");
    })
    .then((value) => {
        // Skipped because previous step rejected.
        console.log(value);
    })
    .catch((error) => {
        console.log("Caught:", error.message);

        // Recover by returning a fallback value.
        return "Fallback data";
    })
    .then((value) => {
        console.log("Recovered:", value);
    });


// ============================================================
// 5. PROMISE.RESOLVE() AND PROMISE.REJECT()
// ============================================================

/*
 * Promise.resolve(value)
 * Creates a fulfilled Promise.
 *
 * Promise.reject(error)
 * Creates a rejected Promise.
 */

Promise.resolve("Success")
    .then(console.log);

Promise.reject(new Error("Failure"))
    .catch((error) => console.log(error.message));


// ============================================================
// 6. PROMISE.ALL()
// ============================================================

/*
 * Promise.all()
 *
 * - Waits for ALL promises to fulfill.
 * - Returns results in INPUT ORDER, not completion order.
 * - Rejects immediately when any input rejects.
 * - Other operations are NOT automatically cancelled.
 *
 * Use when every result is required.
 */

const task1 = new Promise(resolve =>
    setTimeout(() => resolve("Task 1"), 1000)
);

const task2 = new Promise(resolve =>
    setTimeout(() => resolve("Task 2"), 500)
);

const task3 = new Promise(resolve =>
    setTimeout(() => resolve("Task 3"), 1500)
);

Promise.all([task1, task2, task3])
    .then((results) => {
        console.log("All results:", results);
    })
    .catch((error) => {
        console.log("One task failed:", error);
    });


// ============================================================
// 7. PROMISE.ALLSETTLED()
// ============================================================

/*
 * Promise.allSettled()
 *
 * - Waits for every Promise to settle.
 * - Does not reject because an input rejects.
 * - Returns the status and result/reason of every input.
 *
 * Use when you need the outcome of every operation.
 */

Promise.allSettled([
    Promise.resolve("Success"),
    Promise.reject(new Error("Failed")),
    Promise.resolve("Another success")
])
    .then((results) => {
        results.forEach((result) => {
            if (result.status === "fulfilled") {
                console.log("Success:", result.value);
            } else {
                console.log("Failure:", result.reason.message);
            }
        });
    });


// ============================================================
// 8. PROMISE.RACE()
// ============================================================

/*
 * Promise.race()
 *
 * - Returns the result of the FIRST settled Promise.
 * - Settled means fulfilled OR rejected.
 * - Does not cancel the remaining operations.
 *
 * Useful for implementing timeout patterns.
 */

const slowTask = new Promise(resolve =>
    setTimeout(() => resolve("Slow task"), 2000)
);

const fastTask = new Promise(resolve =>
    setTimeout(() => resolve("Fast task"), 500)
);

Promise.race([slowTask, fastTask])
    .then(console.log);


// ============================================================
// 9. PROMISE.ANY()
// ============================================================

/*
 * Promise.any()
 *
 * - Returns the FIRST successfully fulfilled Promise.
 * - Ignores rejected promises while waiting.
 * - Rejects with AggregateError if ALL promises reject.
 *
 * Useful when multiple servers can provide the same result.
 */

Promise.any([
    Promise.reject(new Error("Server 1 failed")),
    Promise.resolve("Server 2 succeeded"),
    Promise.resolve("Server 3 succeeded")
])
    .then(console.log)
    .catch((error) => {
        console.log(error.errors);
    });


// ============================================================
// 10. ASYNC / AWAIT
// ============================================================

/*
 * async:
 * - Makes a function return a Promise.
 * - Returning a value fulfills that Promise.
 * - Throwing an error rejects that Promise.
 *
 * await:
 * - Waits for a Promise to settle.
 * - Returns its fulfilled value.
 * - Throws its rejection reason.
 * - Pauses the async function, NOT the entire JS thread.
 */

async function getData() {
    const result = await Promise.resolve("Data received");

    console.log(result);

    return result;
}

getData();


// ============================================================
// 11. ERROR HANDLING WITH ASYNC / AWAIT
// ============================================================

/*
 * try/catch handles rejected awaited Promises.
 * finally executes regardless of success or failure.
 */

async function fetchData() {
    try {
        const result = await Promise.reject(
            new Error("API request failed")
        );

        return result;

    } catch (error) {
        console.log("Error:", error.message);

        return null;

    } finally {
        console.log("Cleanup completed");
    }
}

fetchData();


// ============================================================
// 12. PARALLEL VS SEQUENTIAL EXECUTION
// ============================================================

function performTask(id, delay) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(`Task ${id} completed`);
            resolve(id);
        }, delay);
    });
}


// PARALLEL EXECUTION
/*
 * All tasks start before Promise.all() waits for them.
 * Independent operations can run concurrently.
 */

async function parallelExecution() {
    const results = await Promise.all([
        performTask(1, 1000),
        performTask(2, 1000),
        performTask(3, 1000)
    ]);

    console.log("Parallel results:", results);
}


// SEQUENTIAL EXECUTION
/*
 * Each task starts only after the previous one completes.
 * Useful when one operation depends on another.
 */

async function sequentialExecution() {
    const result1 = await performTask(1, 1000);
    const result2 = await performTask(2, 1000);
    const result3 = await performTask(3, 1000);

    console.log("Sequential results:", [
        result1,
        result2,
        result3
    ]);
}


// ============================================================
// 13. PRACTICAL FETCH API EXAMPLE
// ============================================================

/*
 * fetch() already returns a Promise.
 * No need to wrap it inside another Promise.
 *
 * IMPORTANT:
 * HTTP errors like 404 and 500 do not automatically reject fetch().
 * Always check response.ok.
 */

async function fetchUser(userId) {
    const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`
    );

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const user = await response.json();

    return user;
}

// Usage:
// fetchUser(1)
//     .then(console.log)
//     .catch(console.error);


// ============================================================
// 14. TIMEOUT USING PROMISE.RACE()
// ============================================================

/*
 * Promise.race() can implement a timeout.
 *
 * IMPORTANT:
 * A timeout does not automatically cancel the original operation.
 */

function withTimeout(promise, timeoutMs) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Operation timed out"));
        }, timeoutMs);
    });

    return Promise.race([
        promise,
        timeoutPromise
    ]);
}

// Usage:
withTimeout(
    performTask(1, 1000),
    2000
)
    .then(console.log)
    .catch(console.error);


// ============================================================
// 15. PROMISE EXECUTOR VS THEN() TIMING
// ============================================================

/*
 * Promise executor runs synchronously.
 *
 * .then() callbacks run asynchronously as microtasks.
 *
 * Expected order:
 * 1. Before Promise
 * 2. Executor
 * 3. After Promise
 * 4. Then callback
 */

console.log("Before Promise");

const timingPromise = new Promise((resolve) => {
    console.log("Executor");
    resolve("Done");
});

timingPromise.then((value) => {
    console.log("Then callback:", value);
});

console.log("After Promise");


// ============================================================
// 16. COMMON MISTAKES
// ============================================================

/*
 * 1. FORGETTING RETURN IN .THEN()
 *
 * Incorrect:
 * .then(value => {
 *     someAsyncFunction(value);
 * })
 *
 * Correct:
 * .then(value => {
 *     return someAsyncFunction(value);
 * })
 *
 *
 * 2. USING ASYNC PROMISE EXECUTORS
 *
 * Avoid:
 * new Promise(async (resolve, reject) => {
 *     ...
 * });
 *
 * The Promise constructor does not wait for the executor's
 * returned Promise. Use an async function directly instead.
 *
 *
 * 3. CREATING UNNECESSARY PROMISE WRAPPERS
 *
 * Avoid:
 * function getData() {
 *     return new Promise((resolve, reject) => {
 *         fetch(url).then(resolve).catch(reject);
 *     });
 * }
 *
 * Better:
 * function getData() {
 *     return fetch(url);
 * }
 *
 *
 * 4. ASSUMING FETCH REJECTS ON HTTP ERRORS
 *
 * Always check response.ok.
 *
 *
 * 5. ASSUMING PROMISE.RACE CANCELS OTHER OPERATIONS
 *
 * It does not. Use AbortController when supported.
 *
 *
 * 6. NOT HANDLING REJECTIONS
 *
 * Use .catch() or try/catch with await.
 */


// ============================================================
// 17. QUICK COMPARISON
// ============================================================

/*
 * Promise.all()
 * -> Fulfills when ALL fulfill.
 * -> Rejects when ANY rejects.
 *
 * Promise.allSettled()
 * -> Waits for ALL to settle.
 * -> Reports every success and failure.
 *
 * Promise.race()
 * -> Returns the FIRST settled result.
 *
 * Promise.any()
 * -> Returns the FIRST successful result.
 * -> Rejects only when ALL reject.
 */


// ============================================================
// 18. KEY TAKEAWAYS
// ============================================================

/*
 * 1. Promises manage asynchronous results.
 * 2. Promise states: pending, fulfilled, rejected.
 * 3. Promise executors run synchronously.
 * 4. then(), catch(), and finally() return new Promises.
 * 5. Return values control the next step in a Promise chain.
 * 6. Throwing an error rejects the next Promise.
 * 7. Async functions always return Promises.
 * 8. Await pauses the async function, not the JS thread.
 * 9. Promise.all() is useful for concurrent independent tasks.
 * 10. Promise.allSettled() captures every outcome.
 * 11. Promise.race() returns the first settled outcome.
 * 12. Promise.any() returns the first successful outcome.
 * 13. Promises do not provide automatic cancellation.
 * 14. Promise callbacks execute as microtasks.
 */
