import { get, hostname, post } from "./ajax"
import { htmlElements } from "./dom"

let universalMessageInterval: any;

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

const updateMessages = (data: any) => {
    htmlElements.chatList.innerHTML = ''
    get(hostname + '/api/messages/getlist', async (response: any) => {
        for (let message in response.messages) {
            let chatElement = <HTMLElement>document.createElement('div')
            if (response.messages[message].author === sessionStorage.getItem('userId')) {
                chatElement.textContent = response.messages[message].message;
                chatElement.className = "chat right"
            } else {

                // af simon
                const headers = new Headers();
                headers.append('Content-Type', 'application/json'),
                headers.append('Data-Body', JSON.stringify({userId: response.messages[message].author}));
                const user = await (await fetch(hostname + '/api/users/get', {headers: headers, method: 'GET', redirect: 'follow'})).json();
                
                chatElement.textContent = '[' + (user ? user.username : response.messages[message].author) + ']: ' + response.messages[message].message;
                chatElement.className = "chat left"
            }
            htmlElements.chatList.appendChild(chatElement);
        }
    }, {messages: data.messages})
}

export const displayMessage = (data: any) => {
    clearInterval(universalMessageInterval);
    htmlElements.roomTitle.textContent = data.name;
    updateMessages(data);
    let lastUpdate = Date.now();
    universalMessageInterval = setInterval(async () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json'),
        headers.append('Data-Body', JSON.stringify({roomId: data.roomId}));
        const lastUpdated = await (await fetch(hostname + '/api/messages/checkupdated', { headers: headers, method: 'GET', redirect: 'follow' })).json();
        console.log(lastUpdated.lastUpdated, lastUpdate)
        if(lastUpdated.lastUpdated !== lastUpdate) {
            lastUpdate = lastUpdated.lastUpdated;
            updateMessages(data);
        }
    }, 500);
}