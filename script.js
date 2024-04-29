document.addEventListener("DOMContentLoaded", function() {
    const channelList = document.getElementById("channel-list-ul");
    const messageContainer = document.getElementById("message-container");
    const messageInput = document.getElementById("message-input");
    const sendButton = document.getElementById("send-btn");
    const addChannelButton = document.getElementById("add-channel-btn");
    const currentChannelTitle = document.getElementById("current-channel");
    const profileButton = document.getElementById("profile-btn");
    const profilePanel = document.getElementById("profile");

    let currentChannel = null;
    const channels = [];

    // Function to add a new channel
    function addChannel() {
        const channelName = prompt("Enter channel name:");
        if (channelName) {
            const newChannel = { 
                name: channelName, 
                messages: []
            };
            channels.push(newChannel);
            const channelListItem = document.createElement("li");
            channelListItem.innerText = newChannel.name;
            channelListItem.addEventListener("click", () => switchChannel(newChannel));
            channelList.appendChild(channelListItem);
            switchChannel(newChannel);
        }
    }

    // Event listener for save settings button click
    document.getElementById("save-settings-btn").addEventListener("click", () => {
        channelSettingsPanel.style.display = "none";
    });

    // Function to handle sending a message
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== "" && currentChannel) {
            const timestamp = new Date().toLocaleString();
            const sender = "You";
            currentChannel.messages.push({ text: message, timestamp: timestamp, sender: sender });
            renderMessages();
            messageInput.value = "";
        }
    }

    // Event listener for send button click
    sendButton.addEventListener("click", sendMessage);

    // Event listener for pressing Enter key in message input
    messageInput.addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    // Event listener for add channel button click
    addChannelButton.addEventListener("click", addChannel);

    // Event listener for profile button click
    profileButton.addEventListener("click", () => {
        profilePanel.style.display = "block";
    });

    // Function to render messages of the current channel
    function renderMessages() {
        messageContainer.innerHTML = "";
        if (currentChannel) {
            currentChannel.messages.forEach(message => {
                addMessage(message.text, message.timestamp, message.sender);
            });
        }
    }

    // Function to add a message to the message container
    function addMessage(message, timestamp, sender) {
        const messageElement = document.createElement("div");
        messageElement.classList.add("message");
        messageElement.innerHTML = `
            <div class="message-sender">${sender}:</div>
            <div class="message-text">${message}</div>
            <div class="message-timestamp">${timestamp}</div>
        `;
        messageContainer.appendChild(messageElement);
        messageContainer.scrollTop = messageContainer.scrollHeight;
    }

    // Function to switch to a channel
    function switchChannel(channel) {
        currentChannel = channel;
        renderMessages();
        currentChannelTitle.innerText = currentChannel.name;
    }
});
