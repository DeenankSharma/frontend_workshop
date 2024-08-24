document.addEventListener('DOMContentLoaded', () => {
    fetchPendingMessages();
    fetchApprovedMessages();
});

async function fetchPendingMessages() {
    try {
        const response = await fetch('https://zcross.pythonanywhere.com/api/pending-messages');
        const data = await response.json();
        displayMessages(data, 'pending-messages', true);
    } catch (error) {
        console.error('Error fetching pending messages:', error);
    }
}

async function fetchApprovedMessages() {
    try {
        const response = await fetch('https://zcross.pythonanywhere.com/api/messages');
        const data = await response.json();
        displayMessages(data, 'messages', false);
    } catch (error) {
        console.error('Error fetching approved messages:', error);
    }
}

function displayMessages(messages, containerId, isPending) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    messages.forEach(message => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `
            <p><strong>${message.username}:</strong> ${message.content}</p>
            ${isPending ? `<button onclick="approveMessage(${message.id})">Approve</button>
            <button onclick="rejectMessage(${message.id})">Reject</button>` : ''}
        `;
        container.appendChild(messageElement);
    });
}

async function approveMessage(id) {
    try {
        const response = await fetch('https://zcross.pythonanywhere.com/api/approve-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            fetchPendingMessages();
            fetchApprovedMessages();
        }
    } catch (error) {
        console.error('Error approving message:', error);
    }
}

async function rejectMessage(id) {
    try {
        const response = await fetch('https://zcross.pythonanywhere.com/api/reject-message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id })
        });
        if (response.ok) {
            fetchPendingMessages();
        }
    } catch (error) {
        console.error('Error rejecting message:', error);
    }
}