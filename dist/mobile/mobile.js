let roomContainer = document.getElementById('room-container');
let roomList = document.getElementById('room-list-container')
let chatContainer = document.getElementById('chat-container');
let backButton = document.getElementById('back-button');
backButton.addEventListener('click', () => {
    chatContainer.className = 'hidden';
    roomContainer.className = '';
})
roomList.addEventListener('click', () => {
    chatContainer.className = '';
    roomContainer.className = 'hidden';
})