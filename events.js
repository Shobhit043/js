
// ============================================================
// JAVASCRIPT EVENTS - REFERENCE NOTES
// ============================================================


// ============================================================
// 1. WHAT ARE EVENTS?
// ============================================================

// Events are actions that happen in the browser.
//
// Examples:
// - User clicks a button
// - User types in an input
// - Mouse moves
// - Form is submitted
// - Page finishes loading
//
// JavaScript can "listen" for these events and execute code.


// ============================================================
// 2. BASIC HTML SETUP
// ============================================================

/*

<!DOCTYPE html>
<html>
<body>

    <button id="btn">Click Me</button>

    <script src="events.js"></script>
</body>
</html>

*/


// ============================================================
// 3. SELECTING AN ELEMENT
// ============================================================

const button = document.querySelector("#btn");


// ============================================================
// 4. addEventListener()
// ============================================================

// Syntax:
//
// element.addEventListener(eventType, callbackFunction);

button.addEventListener("click", function () {
    console.log("Button clicked");
}, false);


// Arrow function version

button.addEventListener("click", () => {
    console.log("Button clicked using arrow function");
});


// ============================================================
// 5. IMPORTANT: CALLBACK FUNCTION
// ============================================================

// The function is NOT called immediately.

button.addEventListener("click", handleClick);

function handleClick() {
    console.log("Clicked");
}


// ❌ WRONG - function executes immediately
// button.addEventListener("click", handleClick());


// ============================================================
// 6. EVENT OBJECT
// ============================================================

// JavaScript automatically provides an Event object.

button.addEventListener("click", (event) => {
    console.log(event);
});


// Common properties

button.addEventListener("click", (event) => {
    console.log(event.type);       // click
    console.log(event.target);     // Element that triggered event
    console.log(event.currentTarget); // Element listener is attached to
});


// ============================================================
// 7. event.target vs event.currentTarget
// ============================================================

/*

event.target
→ The actual element where the event happened.

event.currentTarget
→ The element whose event listener is currently running.

*/


// ============================================================
// 8. CLICK EVENT
// ============================================================

button.addEventListener("click", () => {
    console.log("Button was clicked");
});


// ============================================================
// 9. DOUBLE CLICK EVENT
// ============================================================

button.addEventListener("dblclick", () => {
    console.log("Button double-clicked");
});


// ============================================================
// 10. MOUSE EVENTS
// ============================================================

// mouseenter
button.addEventListener("mouseenter", () => {
    console.log("Mouse entered");
});

// mouseleave
button.addEventListener("mouseleave", () => {
    console.log("Mouse left");
});

// mousemove
button.addEventListener("mousemove", () => {
    console.log("Mouse moving");
});

// mousedown
button.addEventListener("mousedown", () => {
    console.log("Mouse button pressed");
});

// mouseup
button.addEventListener("mouseup", () => {
    console.log("Mouse button released");

});


// ============================================================
// 11. KEYBOARD EVENTS
// ============================================================

document.addEventListener("keydown", (event) => {
    console.log("Key pressed:", event.key);
});

document.addEventListener("keyup", (event) => {
    console.log("Key released:", event.key);
});


// Check for a specific key

document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        console.log("Enter key pressed");
    }
});


// ============================================================
// 12. INPUT EVENT
// ============================================================

/*

HTML:

<input id="name" type="text">

*/

const input = document.querySelector("#name");

input.addEventListener("input", (event) => {
    console.log(event.target.value);
});


// The "input" event happens whenever the input value changes.


// ============================================================
// 13. CHANGE EVENT
// ============================================================

input.addEventListener("change", (event) => {
    console.log("Value changed:", event.target.value);
});

/*

Difference:

input
→ Fires whenever the value changes.

change
→ Usually fires when the user finishes changing the value
  and the element loses focus.

*/


// ============================================================
// 14. FOCUS EVENTS
// ============================================================

input.addEventListener("focus", () => {
    console.log("Input focused");
});

input.addEventListener("blur", () => {
    console.log("Input lost focus");
});


// ============================================================
// 15. FORM SUBMIT EVENT
// ============================================================

/*

HTML:

<form id="form">
    <input type="text" id="username">
    <button type="submit">Submit</button>
</form>

*/

const form = document.querySelector("#form");

form.addEventListener("submit", (event) => {

    // Prevents page reload / default form submission
    event.preventDefault();

    console.log("Form submitted");
});


// ============================================================
// 16. preventDefault()
// ============================================================

// Some HTML elements have default behavior.
//
// Examples:
// - Form submission reloads page
// - Link navigates to another page

/*

HTML:

<a href="https://google.com" id="link">Google</a>

*/

const link = document.querySelector("#link");

link.addEventListener("click", (event) => {

    event.preventDefault();

    console.log("Navigation prevented");
});


// ============================================================
// 17. EVENT BUBBLING
// ============================================================

/*

HTML:

<div id="parent">
    <button id="child">Click</button>
</div>

*/


const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

parent.addEventListener("click", () => {
    console.log("Parent clicked");
});

child.addEventListener("click", () => {
    console.log("Child clicked");
});


/*

When the child is clicked:

1. Child listener runs
2. Event bubbles up
3. Parent listener runs

Output:

Child clicked
Parent clicked

*/


// ============================================================
// 18. stopPropagation()
// ============================================================

// Stops the event from moving to parent elements.

child.addEventListener("click", (event) => {

    event.stopPropagation();

    console.log("Child clicked");
});


/*

Now when child is clicked:

Child clicked

Parent event will NOT run.

*/


// ============================================================
// 19. EVENT CAPTURING
// ============================================================

// By default, events generally use bubbling.
//
// Capturing goes:
//
// Parent → Child
//
// Bubbling goes:
//
// Child → Parent


parent.addEventListener(
    "click",
    () => {
        console.log("Parent - capturing");
    },
    true
);


// Third argument:
//
// true  → Capturing
// false → Bubbling (default)


// ============================================================
// 20. EVENT DELEGATION
// ============================================================

// Instead of adding listeners to every child,
// add ONE listener to the parent.

/*

HTML:

<ul id="list">
    <li>Apple</li>
    <li>Mango</li>
    <li>Banana</li>
</ul>

*/

const list = document.querySelector("#list");

list.addEventListener("click", (event) => {

    // Check what was actually clicked
    if (event.target.tagName === "LI") {
        console.log(event.target.textContent);
    }
});


/*

Benefits:

✓ Fewer event listeners
✓ Works with dynamically added elements
✓ More efficient

*/


// ============================================================
// 21. DYNAMIC ELEMENTS WITH EVENT DELEGATION
// ============================================================

const addButton = document.querySelector("#addButton");

addButton.addEventListener("click", () => {

    const newItem = document.createElement("li");

    newItem.textContent = "New Item";

    list.appendChild(newItem);
});


/*

Because the event listener is on the UL,
the newly created LI will also work automatically.

*/


// ============================================================
// 22. removeEventListener()
// ============================================================

// IMPORTANT:
// You need a reference to the same function.

function sayHello() {
    console.log("Hello");
}

button.addEventListener("click", sayHello);

// Later remove it
button.removeEventListener("click", sayHello);


// ❌ This usually cannot be removed easily:

button.addEventListener("click", () => {
    console.log("Hello");
});


// ============================================================
// 23. once OPTION
// ============================================================

// Event listener runs only ONE time.

button.addEventListener(
    "click",
    () => {
        console.log("Runs only once");
    },
    { once: true }
);


// ============================================================
// 24. PAGE LOAD EVENTS
// ============================================================

// Fires when the HTML document has been completely loaded.

document.addEventListener("DOMContentLoaded", () => {
    console.log("HTML loaded");
});


// Window fully loaded (HTML, images, etc.)

window.addEventListener("load", () => {
    console.log("Page fully loaded");
});


// ============================================================
// 25. SCROLL EVENT
// ============================================================

window.addEventListener("scroll", () => {

    console.log("Page is scrolling");

});


// Current vertical scroll position

window.addEventListener("scroll", () => {

    console.log(window.scrollY);

});


// ============================================================
// 26. RESIZE EVENT
// ============================================================

window.addEventListener("resize", () => {

    console.log("Window width:", window.innerWidth);

});


// ============================================================
// 27. COMMON EVENT TYPES
// ============================================================

/*

Mouse Events:
--------------
click
dblclick
mouseenter
mouseleave
mousemove
mousedown
mouseup


Keyboard Events:
----------------
keydown
keyup


Form/Input Events:
------------------
input
change
submit
focus
blur


Window Events:
--------------
load
scroll
resize


*/


// ============================================================
// 28. this INSIDE REGULAR FUNCTION
// ============================================================

button.addEventListener("click", function () {

    // In a regular function:
    // this usually refers to the element
    // whose listener is running.

    console.log(this);

});


// ============================================================
// 29. ARROW FUNCTION AND this
// ============================================================

button.addEventListener("click", () => {

    // Arrow functions do NOT get their own `this`.
    // Use event.currentTarget if you need the element.

});


// Recommended:

button.addEventListener("click", (event) => {

    console.log(event.currentTarget);

});


// ============================================================
// 30. IMPORTANT: target vs currentTarget
// ============================================================

/*

event.target
→ Element that originally triggered the event.

event.currentTarget
→ Element where the listener is attached.


Example:

<div id="parent">
    <button id="child">Click</button>
</div>

Listener is attached to parent.

If button is clicked:

event.target
→ button

event.currentTarget
→ parent

*/


// ============================================================
// THINGS TO REMEMBER
// ============================================================

/*

1. addEventListener() is the recommended way
   to handle events.

2. Do NOT call the callback function directly:

   ❌ addEventListener("click", functionName())
   ✓ addEventListener("click", functionName)

3. The Event object provides information
   about the event.

4. event.target
   → Original element that triggered the event.

5. event.currentTarget
   → Element whose listener is running.

6. preventDefault()
   → Stops default browser behavior.

7. stopPropagation()
   → Stops event propagation.

8. Events generally bubble upward:

   Child → Parent → Grandparent

9. Event delegation:
   → Add listener to parent and use event.target.

10. removeEventListener() requires the same
    function reference.

11. { once: true }
    → Runs listener only once.

12. Regular functions and arrow functions
    behave differently with `this`.

*/

// ============================================================
// 19. EVENT CAPTURING vs EVENT BUBBLING (DETAILED)
// ============================================================

/*
WHAT IS EVENT PROPAGATION?

When an event occurs on an element, the browser propagates
that event through three phases:

1. CAPTURING PHASE:
   Event travels from the outermost ancestor towards the target.

2. TARGET PHASE:
   Event reaches the actual element where it occurred.

3. BUBBLING PHASE:
   Event travels from the target back towards its ancestors.


HTML STRUCTURE:

<div id="grandparent">
    <div id="parent">
        <button id="child">Click Me</button>
    </div>
</div>


EVENT FLOW:

Capturing:
Grandparent → Parent → Child

Target:
Child

Bubbling:
Child → Parent → Grandparent

*/


// ------------------------------------------------------------
// A. REGISTERING EVENT DURING CAPTURING
// ------------------------------------------------------------

const grandparent = document.querySelector("#grandparent");
const parent = document.querySelector("#parent");
const child = document.querySelector("#child");

// Third parameter = true means capturing phase.

grandparent.addEventListener("click", () => {
    console.log("Grandparent - Capturing");
}, true);

parent.addEventListener("click", () => {
    console.log("Parent - Capturing");
}, true);

child.addEventListener("click", () => {
    console.log("Child - Target");
});


/*
OUTPUT WHEN CHILD IS CLICKED:

Grandparent - Capturing
Parent - Capturing
Child - Target


WHY?

The event travels from the outermost ancestor towards
the target element.

The parent gets an opportunity to handle the event
BEFORE the child's event listener executes.
*/


// ------------------------------------------------------------
// B. REGISTERING EVENT DURING BUBBLING
// ------------------------------------------------------------

// Third parameter is false by default.
// Therefore, these listeners execute during bubbling.

grandparent.addEventListener("click", () => {
    console.log("Grandparent - Bubbling");
});

parent.addEventListener("click", () => {
    console.log("Parent - Bubbling");
});


/*
OUTPUT WHEN CHILD IS CLICKED:

Grandparent - Capturing
Parent - Capturing
Child - Target
Parent - Bubbling
Grandparent - Bubbling


Notice:

Capturing: Outside → Inside
Bubbling:  Inside → Outside
*/


// ------------------------------------------------------------
// C. WHY IS EVENT CAPTURING USEFUL?
// ------------------------------------------------------------

/*
One important use case is handling an event before
the target element's event listener executes.

For example:

The parent can perform preliminary operations,
monitor clicks, or execute parent-level logic
before the child handles the event.

Another important use case is when a child calls
stopPropagation().

A parent capturing listener has already executed
before the event reaches the child.
*/


// ------------------------------------------------------------
// D. CAPTURING vs stopPropagation()
// ------------------------------------------------------------

// Parent listener during capturing
parent.addEventListener("click", () => {
    console.log("Parent capturing executed");
}, true);

// Child listener
child.addEventListener("click", (event) => {

    console.log("Child clicked");

    // Stops further event propagation.
    event.stopPropagation();

});


/*
OUTPUT WHEN CHILD IS CLICKED:

Parent capturing executed
Child clicked


WHY DOES THE PARENT STILL EXECUTE?

1. Event first travels through the capturing phase.
2. Parent capturing listener executes.
3. Event reaches the child.
4. Child calls stopPropagation().
5. Further propagation is stopped.

The parent capturing listener cannot be undone
because it has already executed.


IMPORTANT:

If the parent listener were registered during bubbling,
it would NOT execute after the child stops propagation.
*/


// ------------------------------------------------------------
// E. CAPTURING USING OPTIONS OBJECT
// ------------------------------------------------------------

// Instead of passing true, we can use an options object.

parent.addEventListener("click", () => {
    console.log("Capturing using options object");
}, {
    capture: true
});

// Equivalent to:

parent.addEventListener("click", () => {
    console.log("Capturing using boolean");
}, true);


/*
THIRD PARAMETER:

true
    → Capturing phase

false
    → Bubbling phase (default)

{ capture: true }
    → Capturing phase

{ capture: false }
    → Bubbling phase
*/


// ------------------------------------------------------------
// F. OTHER IMPORTANT EVENT LISTENER OPTIONS
// ------------------------------------------------------------

// once: Listener automatically removes itself after execution.

child.addEventListener("click", () => {
    console.log("This executes only once");
}, {
    once: true
});


// passive: Indicates that the listener will not call
// preventDefault(). Useful for certain scrolling/touch events.

window.addEventListener("scroll", () => {
    console.log("Scrolling...");
}, {
    passive: true
});


/*
IMPORTANT OPTIONS:

capture:
    Determines capturing or bubbling phase.

once:
    Executes the listener only once.

passive:
    Indicates that preventDefault() will not be called.

*/


// ------------------------------------------------------------
// G. IMPORTANT DIFFERENCE: preventDefault vs stopPropagation
// ------------------------------------------------------------

/*
event.preventDefault()
    → Prevents the browser's default action.
    → Does NOT stop event propagation.

event.stopPropagation()
    → Stops further event propagation.
    → Does NOT prevent the default browser action.

Example:

Form submission:
preventDefault() prevents the normal form submission.

Nested elements:
stopPropagation() prevents the event from reaching
further ancestors or descendants in its propagation path.
*/


// ============================================================
// THINGS TO REMEMBER
// ============================================================

/*

1. Event propagation has three phases:
   Capturing → Target → Bubbling.

2. Capturing travels from parent to child.

3. Bubbling travels from child to parent.

4. Bubbling is the default behavior.

5. The third parameter of addEventListener()
   controls the propagation phase.

6. Capturing is useful when an ancestor needs to
   handle an event before the target's listener.

7. stopPropagation() stops further propagation,
   but does not cancel the default browser action.

8. preventDefault() cancels the default browser action,
   but does not stop event propagation.

9. Capturing and bubbling are phases of the SAME event,
   not separate events.

10. Event delegation commonly uses bubbling.

11. The options object provides additional controls
    such as capture, once and passive.

*/
