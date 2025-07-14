

function openChat(userElement){
    console.log("user clicked: ", userElement.dataset.userName);
    const userId = userElement.dataset.userId;
    const userName = userElement.dataset.userName;

    let users_chat_container = document.getElementById('users_chats');
    //prevent adding more than 3 chats
    if(users_chat_container.children.length >= 3){
        // remove the first chat box
        const firstChatbox = users_chat_container.children[0];
        firstChatbox.remove();
    }
    //check if chat box already exists
    const exists = document.getElementById(`chatBox_${userId}`);
    if(exists){
        return;
    }
    users_chat_container.innerHTML  += `
        <div id="chatBox_${userId}" class="bottom-4 right-4 bg-white shadow-lg rounded-lg w-72  z-50">
                    <div class="p-3 border-b flex justify-between items-center bg-gray-100 rounded-t-lg">
                            <span id="chatUserName" class="font-semibold text-sm text-gray-700"> ${userName}'s Chat</span>
                            <button onclick="closeChat(${userId})" class="text-gray-500 hover:text-red-500">&times;</button>
                        </div>
                        <div class="p-3 h-40 overflow-y-auto text-sm text-gray-700">
                            <!-- Message area (you can extend this) -->
                            <p class="text-center text-gray-400">Start chatting with <span id="chatUserTarget">${userName}</span>...</p>
                        </div>
                        <div class="p-2 border-t flex">
                            <input type="text" class="flex-1 border rounded-l px-2 py-1 text-sm" placeholder="Type a message...">
                            <button class="bg-indigo-500 text-white px-3 py-1 rounded-r text-sm">Send</button>
                        </div>
        </div>
    `

}

function closeChat(userId){
    const chatBox = document.getElementById(`chatBox_${userId}`);
    if (chatBox) {
        chatBox.remove();
    }
}


