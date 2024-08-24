// const res = require("express/lib/response");

const bigContainer = document.getElementById("big-container");

async function getPosts() {
    try {
        const response = await fetch("https://zcross.pythonanywhere.com/api/messages",{headers:{"Content-Type":"application/json"}});

        // Log the entire response object for debugging
        console.log('Response:', response);

        // Check if the response is ok
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Check the content-type of the response
        const contentType = response.headers.get('Content-Type');
        console.log('Content-Type:', contentType);

        // If the content type indicates JSON, parse it as JSON
        if (contentType && contentType.includes('application/json')) {
            const data = await response.json();
            console.log('Data:', data);
            appendPosts(data);
        } else {
            // Handle non-JSON responses
            const text = await response.text();
            console.error('Expected JSON but received:', text);
            displayError("Failed to load messages. The server did not return JSON data.");
        }
    } catch (error) {
        console.error('Error fetching posts:', error);
        displayError("Failed to load messages. Please try again later.");
    }
}


function appendPosts(messages) {
    bigContainer.innerHTML = ''; // Clear existing content

    if (messages.length === 0) {
        displayNoMessages();
    } else {
        messages.forEach(message => {
            const div = document.createElement("div");
            const h6 = document.createElement("h6");
            const p = document.createElement("p");
            
            h6.textContent = message.content;
            p.textContent = message.username;
            
            div.appendChild(h6);
            div.appendChild(p);
            div.classList.add("card");
            bigContainer.appendChild(div);
        });
    }
}

function displayNoMessages() {
    const p = document.createElement("p");
    p.textContent = "No posts to display yet!";
    p.classList.add("no-messages");
    bigContainer.appendChild(p);
}

function displayError(message) {
    const errorDiv = document.createElement("div");
    errorDiv.textContent = message;
    errorDiv.classList.add("error-message");
    bigContainer.appendChild(errorDiv);
}

window.addEventListener("load", getPosts);