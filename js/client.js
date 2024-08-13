const socket = io('http://localhost:8000');

const form = document.getElementById("send-container");
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

var audio = new Audio('Assets/ting.mp3');

const append = (message, postition)=>{
    const msgElement = document.createElement('div');
    msgElement.innerText = message;
    msgElement.classList.add('message');
    msgElement.classList.add(postition);
    messageContainer.append(msgElement);
    // if(postition == 'left'){
    //     audio.play();
    // }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
});

const name1 = prompt("enter your name to join");
socket.emit('new-user-joined', name1);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
});

socket.on('receive', data => {
    append(`${data.name} : ${data.message}`, 'left');
});

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
});