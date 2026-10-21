/*
HOW JAVASCRIPT WORKS BEHIND THE SCENES
======================================

Example:

let x = 10;

function add(a, b) {
    let result = a + b;
    return result;
}

let answer = add(5, 3);
console.log(answer); // 8


1. JAVASCRIPT ENGINE
-------------------
- The JavaScript engine processes and executes JavaScript code.
- Examples:
    V8           -> Chrome, Node.js
    SpiderMonkey -> Firefox
    JavaScriptCore -> Safari
- Modern engines use an interpreter and JIT (Just-In-Time)
  compilation to execute code efficiently.
- JavaScript is commonly described as a single-threaded language
  for synchronous execution, although runtimes support asynchronous
  operations and can use additional threads.


2. EXECUTION CONTEXT
--------------------
An Execution Context is the environment in which JavaScript code
is evaluated and executed.

JavaScript commonly uses these types of execution contexts:

1. Global Execution Context (GEC)
   - Created when a script starts executing.
   - Establishes the global environment.
   - Top-level code executes within this context.

2. Function Execution Context
   - Created when a function is called.
   - Provides the environment for that particular function call.
   - Each call has its own parameters and local bindings.

3. Eval Execution Context
   - Associated with code executed through eval(), where applicable.
   - Direct eval has special scope behavior.
   - Generally, avoid eval() unless there is a specific need.


3. WHAT DOES AN EXECUTION CONTEXT CONTAIN?
------------------------------------------
Conceptually, an execution context includes:

A. Lexical Environment
   - Stores bindings for variables, functions, parameters, and
     other declarations according to their scope.
   - Supports lexical scope and access to outer environments.
   - `let` and `const` bindings are established before their
     declarations execute, but cannot be accessed during their
     Temporal Dead Zone (TDZ).
   - Function declarations are initialized according to the
     applicable declaration-instantiation rules.

B. Variable Environment
   - Tracks bindings created through `var` declarations.
   - Is closely related to the Lexical Environment.
   - It is a specification-level concept, not necessarily a
     separate physical memory structure.

C. This Binding
   - Determines the value of `this` for the execution context.
   - For a regular function, `this` generally depends on how the
     function is called and whether strict mode applies.
   - Arrow functions do not create their own `this` binding;
     they inherit it from their surrounding lexical environment.

IMPORTANT:
The Lexical Environment, Variable Environment, and `this` binding
are conceptual specification-level structures. The engine's actual
internal implementation may differ.


4. LEXICAL ENVIRONMENT AND SCOPE CHAIN
--------------------------------------
Example:

let x = 10;

function add(a, b) {
    let result = a + b;
    return result + x;
}

add(5, 3); // 18

Inside add():
    a = 5
    b = 3
    result = 8

The function also accesses x = 10 from its outer scope.

How?
- The function has an outer-environment reference.
- If a name is not found in the current environment, JavaScript
  searches outer environments.
- This process is called lexical scope resolution or the scope chain.

Lexical scope means that access to variables is determined by
where code is defined, not simply by where a function is called.


5. CREATION PHASE AND EXECUTION PHASE
-------------------------------------
A simplified explanation of function execution:

CREATION / SETUP:
- Establish the function's execution context.
- Create the required environment records and bindings.
- Initialize parameters with the supplied argument values.
- Establish applicable `this` behavior.
- Initialize declarations according to JavaScript's rules.

EXECUTION:
- Execute statements in order.
- Evaluate expressions and perform calculations.
- Assign values to variables.
- Call other functions when needed.
- Return a value or finish with undefined if no value is returned.

IMPORTANT:
The Temporal Dead Zone applies to `let`, `const`, and class
bindings before their initialization.
`var` behaves differently and is initialized to undefined during
declaration instantiation.


6. FUNCTION EXECUTION EXAMPLE
-----------------------------
Code:

function add(a, b) {
    let result = a + b;
    return result;
}

let answer = add(5, 3);

STEP 1:
JavaScript encounters the function declaration.
The function becomes available according to declaration rules.
The function body has not executed yet.

STEP 2:
JavaScript reaches:

    let answer = add(5, 3);

The function is called with arguments 5 and 3.

STEP 3:
A Function Execution Context is established.

    a = 5
    b = 3

STEP 4:
The statement executes:

    let result = a + b;

Calculation:

    result = 5 + 3
    result = 8

STEP 5:
The statement executes:

    return result;

The value 8 is returned to the calling code.

STEP 6:
The function finishes and its execution context is removed
from the Call Stack.

STEP 7:
The returned value is assigned to answer.

    let answer = 8;

Therefore:

    console.log(answer); // 8


7. CALL STACK
-------------
The Call Stack tracks active execution contexts.

It follows the LIFO principle:
Last In, First Out.

Example:

function first() {
    second();
}

function second() {
    console.log("Hello");
}

first();

Execution sequence:

1. Global execution begins.
2. first() is called and pushed onto the Call Stack.
3. second() is called and pushed onto the Call Stack.
4. second() finishes and is popped from the stack.
5. first() finishes and is popped from the stack.
6. Global execution continues.

Conceptual stack while second() is running:

    |-------------------|
    | second()          | <- Top
    |-------------------|
    | first()           |
    |-------------------|
    | Global Context    |
    |-------------------|

IMPORTANT:
- The Call Stack and Execution Context are different concepts.
- The Call Stack tracks which contexts are currently active.
- A function call generally adds a context to the stack.
- Returning from a function removes that context from the stack.


8. MEMORY AND GARBAGE COLLECTION
--------------------------------
- JavaScript engines manage memory automatically.
- Objects and functions may remain in memory while reachable.
- Data that is no longer reachable can generally be reclaimed
  by garbage collection.
- Removing a function's execution context from the Call Stack
  does not necessarily destroy every value associated with it.
- Closures can preserve access to outer-scope bindings after
  the outer function has returned.

Example:

function outer() {
    let count = 0;

    return function inner() {
        count++;
        return count;
    };
}

let counter = outer();

counter(); // 1
counter(); // 2

The inner function retains access to count through a closure.
Therefore, count remains available after outer() has returned.


9. HOISTING AND TEMPORAL DEAD ZONE
----------------------------------
Hoisting is a useful term for JavaScript's declaration setup
behavior. It does not mean that source code is literally moved.

Example:

console.log(a); // undefined
var a = 10;

The `var` binding is initialized to undefined before the
assignment executes.

With let:

console.log(b); // ReferenceError
let b = 20;

The binding exists but is uninitialized before the declaration
executes. This period is called the Temporal Dead Zone (TDZ).

Function declaration example:

greet(); // Hello

function greet() {
    console.log("Hello");
}

The function declaration is initialized so that it can be called
before its position in the source code.


10. SYNCHRONOUS EXECUTION AND ASYNCHRONOUS OPERATIONS
-----------------------------------------------------
JavaScript executes ordinary synchronous statements in order.

However, environments such as browsers and Node.js also provide
asynchronous capabilities.

Important components:

- Call Stack:
  Tracks currently executing JavaScript.

- Runtime APIs:
  Provide capabilities such as timers, networking, and I/O.

- Task Queues:
  Hold callbacks waiting to execute.

- Microtask Queue:
  Holds microtasks such as Promise reaction callbacks.

- Event Loop:
  Coordinates when queued work can execute.

Example:

console.log("A");

setTimeout(() => {
    console.log("B");
}, 0);

console.log("C");

Output:

A
C
B

Why?
- A prints immediately.
- The timer callback is scheduled through the runtime.
- C prints before the callback runs.
- The callback runs later when the event loop can process it.

A zero-millisecond timer does not mean the callback executes
immediately.


11. COMPLETE EXECUTION FLOW
---------------------------
JavaScript source code
        |
        v
JavaScript engine processes the code
        |
        v
Global execution context is established
        |
        v
Top-level code executes
        |
        v
Function is called
        |
        v
Function execution context is established
        |
        v
Parameters and local bindings are available
        |
        v
Statements execute and expressions are evaluated
        |
        v
Function returns a value or finishes
        |
        v
Function context leaves the Call Stack
        |
        v
Calling code receives the returned value
        |
        v
Execution continues


12. IMPORTANT INTERVIEW DISTINCTIONS
------------------------------------
Execution Context:
The environment and state needed to execute code.

Lexical Environment:
Bindings and outer-scope relationships used for name resolution.

Variable Environment:
Specification-level environment associated with var declarations.

Call Stack:
Tracks active execution contexts and function calls.

Scope Chain:
The chain of lexical environments used to resolve variable names.

Closure:
A function retaining access to bindings from its lexical scope.

Hoisting:
A convenient description of declaration-instantiation behavior.

Temporal Dead Zone:
The period before a let/const/class binding is initialized.

Event Loop:
Coordinates when queued asynchronous callbacks can execute.

Garbage Collection:
Reclaims memory that is no longer reachable.


KEY TAKEAWAY
------------
When JavaScript executes code, it establishes execution contexts
and the environments needed for that code. The Call Stack tracks
active calls. Lexical environments determine how variables are
resolved. Functions can return values, and closures can preserve
access to outer bindings. The JavaScript runtime additionally
coordinates asynchronous operations through queues and the event
loop.

The execution-context model describes JavaScript behavior; it
does not require the engine to implement each conceptual component
as a separate physical object in memory.
*/