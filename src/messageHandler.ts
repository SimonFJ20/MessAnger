import { get, hostname, post } from "./ajax"
import { htmlElements } from "./dom"

export const useMessageHandler = () => {
    htmlElements.chatField.addEventListener('keypress', (event: KeyboardEvent) => {
        if (!sessionStorage.getItem('roomId') || sessionStorage.getItem('roomId') === 'undefined') return;
        if (event.key === 'Enter') {
            post(hostname + '/api/messages/post', {
                token: sessionStorage.getItem('token'),
                roomId: sessionStorage.getItem('roomId'),
                message: htmlElements.chatField.value,
            }, (response: any) => {
                if (response.success && response.response === 'success') {
                    let chatElement = <HTMLElement>document.createElement('div')
                    chatElement.textContent = htmlElements.chatField.value;
                    chatElement.className = "chat right"    
                    htmlElements.chatList.appendChild(chatElement);

                    htmlElements.chatField.value = '';
                }
            })
        }
    })
}

export const displayMessage = (data: any) => {
    htmlElements.roomTitle.textContent = data.name;
    htmlElements.chatList.innerHTML = ''
    get(hostname + '/api/messages/getlist', (response: any) => {
        for (let message in response.messages) {
            let chatElement = <HTMLElement>document.createElement('div')
            if (response.messages[message].author === sessionStorage.getItem('userId')) {
                chatElement.textContent = response.messages[message].message;
                chatElement.className = "chat right"
            } else {
                chatElement.textContent = '[' + response.messages[message].author + ']: ' + response.messages[message].message;
                chatElement.className = "chat left"
            }
            htmlElements.chatList.appendChild(chatElement);
        }
    }, {messages: data.messages})
}