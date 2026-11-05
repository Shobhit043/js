/**
 * JAVASCRIPT FETCH API
 * =====================================================
 *
 * fetch() is used to make HTTP requests to servers.
 *
 * Common HTTP methods:
 * GET     -> Retrieve data
 * POST    -> Create data
 * PUT     -> Replace existing data
 * PATCH   -> Partially update data
 * DELETE  -> Delete data
 *
 * IMPORTANT:
 * fetch() returns a Promise<Response>.
 * response.json() returns another Promise containing parsed data.
 */


// =====================================================
// 1. BASIC GET REQUEST
// =====================================================

/*
 * GET is the default HTTP method.
 * Used to retrieve data from an API.
 */

async function getUser() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
    );

    // fetch() does not reject automatically for HTTP 404 or 500.
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    // Parse the response body as JSON.(Observe that this process also need await)
    const data = await response.json();

    console.log(data);
}

getUser();


// =====================================================
// 2. UNDERSTANDING RESPONSE OBJECT
// =====================================================

/*
 * fetch() returns a Response object, not the actual API data.
 *
 * Important properties:
 *
 * response.status      -> HTTP status code (200, 404, 500)
 * response.ok          -> true if status is 200-299
 * response.statusText  -> Status message
 * response.headers     -> Response headers
 * response.url         -> Response URL
 *
 * Important methods:
 *
 * response.json()      -> Parse as JSON
 * response.text()      -> Read as text
 * response.blob()      -> Read as binary Blob
 *
 * The response body is normally consumed only once.
 */


// =====================================================
// 3. POST REQUEST
// =====================================================

/*
 * POST sends data to the server.
 *
 * JSON.stringify() converts a JavaScript object into JSON.
 *
 * Content-Type tells the server that we are sending JSON.
 */

async function createPost() {

    const newPost = {
        title: "Learning Fetch",
        body: "Understanding API requests",
        userId: 1
    };

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(newPost)
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    const data = await response.json();

    console.log(data);
}

// createPost();


// =====================================================
// 4. PUT, PATCH AND DELETE
// =====================================================

// PUT: Replace an existing resource.

async function updatePost() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                id: 1,
                title: "Updated title",
                body: "Updated content",
                userId: 1
            })
        }
    );

    const data = await response.json();
    console.log(data);
}


// PATCH: Partially update a resource.

async function patchPost() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
            method: "PATCH",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                title: "Only title updated"
            })
        }
    );

    const data = await response.json();
    console.log(data);
}


// DELETE: Request deletion of a resource.

async function deletePost() {

    const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts/1",
        {
            method: "DELETE"
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
    }

    console.log("Deleted successfully");
}


// =====================================================
// 5. QUERY PARAMETERS
// =====================================================

/*
 * Query parameters are used to filter or search data.
 *
 * Example:
 * /posts?userId=1
 *
 * URLSearchParams handles URL encoding automatically.
 */

async function getUserPosts() {

    const params = new URLSearchParams({
        userId: 1
    });

    const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts?${params}`
    );

    const data = await response.json();

    console.log(data);
}


// =====================================================
// 6. ERROR HANDLING
// =====================================================

/*
 * fetch() rejects for network-level failures.
 *
 * However, HTTP errors (404, 500) do not automatically
 * reject the Promise.
 *
 * Therefore:
 * 1. Use try/catch for network and parsing errors.
 * 2. Check response.ok for HTTP errors.
 */

async function fetchData() {

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users/1"
        );

        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();

        console.log(data);

    } catch (error) {

        console.log("Request failed:", error.message);
    }
}


// =====================================================
// 7. REQUEST HEADERS
// =====================================================

/*
 * Headers provide additional information about a request.
 *
 * Content-Type  -> Format of request body.
 * Accept        -> Preferred response format.
 * Authorization -> Authentication credentials/token.
 */

async function authenticatedRequest() {

    const response = await fetch(
        "https://example.com/api/users",
        {
            method: "GET",

            headers: {
                "Accept": "application/json",
                "Authorization": "Bearer YOUR_TOKEN"
            }
        }
    );

    const data = await response.json();

    console.log(data);
}


// =====================================================
// 8. PARALLEL API REQUESTS
// =====================================================

/*
 * When API requests are independent, run them concurrently.
 *
 * Promise.all() waits for all requests to fulfill.
 *
 * Results preserve input order, not completion order.
 */

async function fetchMultiple() {

    const urls = [
        "https://jsonplaceholder.typicode.com/users/1",
        "https://jsonplaceholder.typicode.com/posts/1",
        "https://jsonplaceholder.typicode.com/comments/1"
    ];

    const responses = await Promise.all(
        urls.map(url => fetch(url))
    );

    // Check every HTTP response.
    for (const response of responses) {
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
    }

    // Parse all response bodies concurrently.
    const results = await Promise.all(
        responses.map(response => response.json())
    );

    console.log(results);
}


// =====================================================
// 9. ABORTCONTROLLER — CANCEL REQUESTS
// =====================================================

/*
 * AbortController allows us to cancel fetch requests.
 *
 * Useful when:
 * - User navigates away.
 * - Search query changes.
 * - Request takes too long.
 *
 * controller.signal is passed to fetch().
 * controller.abort() requests cancellation.
 */

async function cancellableRequest() {

    const controller = new AbortController();

    try {

        const response = await fetch(
            "https://jsonplaceholder.typicode.com/users",
            {
                signal: controller.signal
            }
        );

        const data = await response.json();

        console.log(data);

    } catch (error) {

        if (error.name === "AbortError") {
            console.log("Request cancelled");
        } else {
            console.log(error.message);
        }
    }

    // Call controller.abort() when cancellation is required.
}


// =====================================================
// 10. IMPORTANT CONCEPTS TO REMEMBER
// =====================================================

/*
 * 1. fetch() returns a Promise containing a Response object.
 *
 * 2. response.json() is asynchronous and returns another Promise.
 *
 * 3. GET is the default HTTP method.
 *
 * 4. POST sends data; PUT replaces; PATCH partially updates.
 *
 * 5. JSON.stringify() converts objects into JSON strings.
 *
 * 6. Always check response.ok.
 *
 * 7. Response bodies are normally readable only once.
 *
 * 8. Promise.all() helps execute independent requests concurrently.
 *
 * 9. AbortController supports cancellation.
 *
 * 10. CORS is a browser security mechanism. The server must
 *     allow cross-origin requests.
 *
 * 11. Never expose secret API keys in frontend JavaScript.
 */
