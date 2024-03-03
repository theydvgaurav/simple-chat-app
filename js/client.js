const socket = io('http://localhost:8000');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp')
const messageContainer = document.querySelector("body > div.container")
const append = (message, position, is_user_joining_message=false) => {
    const messageElement = document.createElement('div')
    messageElement.innerText = message;
    messageElement.classList.add(is_user_joining_message ? 'joined-chat' :'message')
    messageElement.classList.add(position)
    messageContainer.append(messageElement);


}
const username = prompt("Enter your user_name to join");
socket.emit('new-user-joined', username);

socket.on('user joined', name => {
    append(`${name} joined the chat`,'center', true);
});

socket.on('receive', data => {
    append(`${data.username}: ${data.message}`,'left');
});

function sendMessage() {
    const message = document.getElementById('messageInp').value

    if(!username)
        alert('Please enter a valid username')
    if (message) {
        socket.emit('send', username, message);
        append(`You: ${message}`,'right');
        document.getElementById('messageInp').value = '';
    } else {
        alert('Please enter a valid message.');
    }
}












