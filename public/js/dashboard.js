

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
    const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    users_chat_container.innerHTML  += `
        <div id="chatBox_${userId}" class="bottom-4 right-4 bg-white shadow-lg rounded-lg w-72 h-[400px] z-50">
                        <div class="p-3 border-b flex justify-between items-center bg-gray-100 rounded-t-lg">
                            <span id="chatUserName" class="font-semibold text-sm text-gray-700"> ${userName}'s Chat</span>
                            <button onclick="closeChat(${userId})" class="text-gray-500 hover:text-red-500">&times;</button>
                        </div>
                        <div class="message-area p-3 h-[300px] overflow-y-auto text-sm text-gray-700">
                            <!-- Message area (you can extend this) -->
                            <p class="text-center text-gray-400">Start chatting with <span id="chatUserTarget">${userName}</span>...</p>

                        </div>
                        <div class="p-2 border-t flex">
                            <form onsubmit="return sendMessage(event,this)" id='chat_form' action="${messageStoreUrl}" method="POST">
                                <input type="hidden" name="_token" value="${csrfToken}">  
                                <input name="message_content" type="text" class="flex-1 border rounded-l px-2 py-1 text-sm" placeholder="Type a message...">
                                <input name="receiver_id" type="text"  value="${userId}" hidden>
                                <button type="submit" class="bg-indigo-500 text-white px-3 py-1 rounded-r text-sm">Send</button>
                            </form>
                        </div>
        </div>
    `;
    fetch(`/message/${userId}`)
    .then(res => res.json())
    .then(data => {
        const messageArea = document.querySelector(`#chatBox_${userId} .message-area`);
        messageArea.innerHTML = "" ;
        data.messages.forEach(msg=>{
            const isCurrentUser = msg.sender_id === currentUserId;
            const alignment = isCurrentUser ? 'text-right text-white bg-indigo-500 my-2' : 'text-left my-2 text-gray-800 bg-gray-200';
            const messageHTML = `
                <div class="${alignment} text-sm mb-1 px-3 py-1 rounded max-w-[80%] ${isCurrentUser ? 'ml-auto' : 'mr-auto'}">
                    ${msg.content}
                </div>
            `;
            messageArea.innerHTML += messageHTML;
            messageArea.scrollTop = messageArea.scrollHeight;

        });
    })
     .catch(err => {
        alert('Failed to load messages:');
    });

}

function closeChat(userId){
    const chatBox = document.getElementById(`chatBox_${userId}`);
    if (chatBox) {
        chatBox.remove();
    }
}

function sendMessage(event,form){
    event.preventDefault();

    const formData = new FormData(form);
    const chatBox = form.closest('.bottom-4');

    fetch(form.action,{
        method: "POST" ,
        headers:{
            "x-CSRF-TOKEN" : formData.get('_token'),
        },
        body:formData ,
    })
    .then((res) => res.json())
    .then((data)=>{
        console.log(data.status);
        const content = data.message.content;
        const messageArea = chatBox.querySelector(".message-area");
        const messageHTML = `   <div class="text-right text-white bg-indigo-500 my-2 text-sm mb-1 px-3 py-1 rounded max-w-[80%] ml-auto">
                                        <p class="text-sm ">${content}</p>
                                    </div>`;
       messageArea.innerHTML += messageHTML;
 messageArea.scrollTop = messageArea.scrollHeight;
        form.reset();


    })
    .catch((err)=>{
        console.error("Error sending message:", err);
    })


    console.log('sending message');
}




