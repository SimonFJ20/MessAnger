import { get, hostname } from "./ajax"
import { htmlElements } from "./dom"
import { displayMessage } from "./messageHandler"
import { displayForm } from "./popupHandler"

let currentRoomButton: HTMLButtonElement;

export const useRoomHandler = () => {
    htmlElements.createRoom.addEventListener('click', () => {
        displayForm('createRoom')
    })
    htmlElements.joinRoom.addEventListener('click', () => {
        displayForm('joinRoom')
    })
    initRoomSearch();
    updateRooms();
}

export const updateRooms = () => {
    htmlElements.roomList.innerHTML = '';
    let token = sessionStorage.getItem('token')
    if (!token) return;

    get(hostname + '/api/rooms/getuser', (userResponse: any) => {
        if (!userResponse.success) return console.warn(`error getting user: ${userResponse.response}`);

        get(hostname + '/api/rooms/getlist', (roomResponse: any) => {
            if (!roomResponse.success) return console.warn(`error getting roomlist: ${roomResponse.response}`)

            for (let i = 0; i < roomResponse.rooms.length; i++) {

                let button = <HTMLButtonElement>document.createElement('button')
                button.className = 'room';
                button.textContent = roomResponse.rooms[i].name;
                htmlElements.roomList.appendChild(button)

                button.addEventListener('click', () => {
                    if (currentRoomButton != button) {
                        currentRoomButton.className = 'room';
                        button.className = 'room active';
                        currentRoomButton = button;
                        sessionStorage.setItem('roomId', roomResponse.rooms[i].roomId)
                        displayMessage(roomResponse.rooms[i])    
                    }
                })

                if (i === 0 && (!sessionStorage.getItem('roomId') || sessionStorage.getItem('roomId') === 'undefined')) {
                    button.className = 'room active';
                    currentRoomButton = button;
                    sessionStorage.setItem('roomId', roomResponse.rooms[i].roomId)
                    displayMessage(roomResponse.rooms[i])    
                } else if (roomResponse.rooms[i].roomId === sessionStorage.getItem('roomId')) {
                    button.className = 'room active';
                    currentRoomButton = button;
                    sessionStorage.setItem('roomId', roomResponse.rooms[i].roomId)
                    displayMessage(roomResponse.rooms[i])
                }
            }
        }, {token: token, rooms: userResponse.rooms})
    }, {token: token, relation: ['joined', 'created'], types: ['public', 'hidden', 'private']})

}

const initRoomSearch = () => {
    // af simon
    const roomSearch = htmlElements.roomSearch as HTMLInputElement
    roomSearch.addEventListener('focusout', () => {setTimeout(() => {updateRooms(); roomSearch.value = ''}, 100)});
    roomSearch.addEventListener('input', () => {
        get(hostname + '/api/rooms/search', (res1: any) => {
            get(hostname + '/api/rooms/getlist', (res: any) => {
                if(!res.success) {
                    console.error('search failed to GET list');
                    return;
                }
                htmlElements.roomList.innerHTML = '';
                const rooms = res.rooms as any[];
                for(let i in rooms) {
                    const button = document.createElement('button');
                    button.className = 'room';
                    button.textContent = rooms[i].name;
                    htmlElements.roomList.appendChild(button);
                    button.addEventListener('click', () => {
                        displayForm('joinRoom', undefined, rooms[i]._id);
                    });
                }
            }, {token: sessionStorage.getItem('token'), rooms: res1.rooms})
        }, {search: roomSearch.value});
    });
}
