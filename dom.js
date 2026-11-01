
// ==========================================
// JavaScript DOM Selectors and Manipulation
// ==========================================


// ==========================================
// 1. getElementById()
// Selects an element using its ID.
// ==========================================

const heading = document.getElementById("heading");
console.log("By ID:", heading);


// ==========================================
// 2. getElementsByClassName()
// Selects all elements with a given class.
// Returns a live HTMLCollection.
// ==========================================

const items = document.getElementsByClassName("item");
console.log("By Class:", items);


// ==========================================
// 3. getElementsByTagName()
// Selects elements using their tag name.
// Returns a live HTMLCollection.
// ==========================================

const paragraphs = document.getElementsByTagName("p");
console.log("By Tag:", paragraphs);


// ==========================================
// 4. querySelector()
// Selects the FIRST matching element.
// Supports CSS selectors.
// ==========================================

const firstItem = document.querySelector(".item");
console.log("Query Selector:", firstItem);

const firstParagraph = document.querySelector("p");
console.log("First Paragraph:", firstParagraph);


// ==========================================
// 5. querySelectorAll()
// Selects ALL matching elements.
// Returns a static NodeList.
// ==========================================

const allItems = document.querySelectorAll(".item");
console.log("Query Selector All:", allItems);

// Iterating over NodeList
allItems.forEach(item => {
    console.log(item.textContent);
});


// ==========================================
// 6. MODIFYING ELEMENTS
// ==========================================
// textContent - give the full text, both visible and the hidden text
// innerHTML - the inner html of the selected section
// innerText - gives only the text that is visible on the html page
const title = document.querySelector("#heading");

// Change text
title.textContent = "Updated Heading";

// Change HTML
title.innerHTML = "<span>Hello DOM</span>";

// Change CSS
title.style.color = "blue";
title.style.fontSize = "30px";

// Change attributes
title.setAttribute("class", "new-heading");


// ==========================================
// 7. CLASS MANIPULATION
// ==========================================

const box = document.querySelector(".box");

// Add class
box.classList.add("active");

// Remove class
box.classList.remove("active");

// Toggle class
box.classList.toggle("active");

// Check class
console.log(box.classList.contains("active"));


// ==========================================
// 8. DOM TRAVERSAL
// ==========================================

const element = document.querySelector(".item");

// Parent
console.log("Parent:", element.parentElement);

// Children
console.log("Children:", element.children);

// First child element
console.log("First Child:", element.firstElementChild);

// Last child element
console.log("Last Child:", element.lastElementChild);

// Next sibling
console.log("Next Sibling:", element.nextElementSibling);

// Previous sibling
console.log("Previous Sibling:", element.previousElementSibling);

// Child Nodes of a Parent
// in js the line break(enter to go to next line) is also a node in the dom, but further line breaks are not considered unless there is some text or other element

console.log("Child nodes:", element.Children)

// ==========================================
// 9. CREATING AND REMOVING ELEMENTS
// ==========================================

// Create element
const newElement = document.createElement("p");

// Add content
newElement.textContent = "New paragraph";

// Append element
document.body.appendChild(newElement);

// Remove element
newElement.remove();


// ==========================================
// 10. EVENT LISTENERS
// ==========================================

const button = document.querySelector("#btn");

button.addEventListener("click", () => {
    console.log("Button clicked!");
});


// ==========================================
// 11. EVENT OBJECT
// ==========================================

button.addEventListener("click", (event) => {
    console.log("Event:", event);
    console.log("Target:", event.target);
    console.log("Event Type:", event.type);
});


// ==========================================
// 12. EVENT DELEGATION
// ==========================================

const list = document.querySelector("#list");

list.addEventListener("click", (event) => {
    if (event.target.matches(".item")) {
        console.log("Clicked:", event.target.textContent);
    }
});


// ==========================================
// END
// ==========================================

