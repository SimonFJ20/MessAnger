import { htmlElements } from "./dom";
import { displayForm } from "./popupHandler";
import { hostname } from './ajax';
import { updateRooms, useRoomHandler } from "./roomHandler";
import { useUserHandler } from "./userHandler";
import { useMessageHandler } from "./messageHandler";

export const formData: any = {
    login: {
        title: 'login',
        objects: [
            {
                name: 'username',
            },
            {
                name: 'password',
                type: 'password',
            }
        ],
        api: hostname + '/api/users/login',
        created: () => {
            let button = <HTMLElement>document.createElement('a');
            button.textContent = 'sign up?'
            button.addEventListener('click', () => {
                displayForm('register');
            }, {once: true})
            htmlElements.popupForm.appendChild(button);    
        },
        completed: (response: any) => {
            sessionStorage.setItem('username', response.username);
            sessionStorage.setItem('userId', response.userId);
            sessionStorage.setItem('token', response.token);
            sessionStorage.removeItem('roomId')

            useRoomHandler();
            useUserHandler();
            useMessageHandler();
            return true;
        }
    },
    register: {
        title: 'register',
        objects: [
            {
                name: 'username',
            },
            {
                name: 'email',
                type: 'email'
            },
            {
                name: 'password',
                type: 'password',
            }
        ],
        api: hostname + '/api/users/register',
        created: () => {
            let button = <HTMLElement>document.createElement('a');
            button.textContent = 'login?'
            button.addEventListener('click', () => {
                displayForm('login');
            }, {once: true})
            htmlElements.popupForm.appendChild(button);      
        },
        completed: () => {
            return displayForm('login')
        },
    },
    createRoom: {
        title: 'create room',
        objects: [
            {
                name: 'name',
                label: 'room name'
            },
            {
                name: 'description',
            },
            {
                name: 'status',
                label: 'type (public/hidden/private)'
            },
            {
                name: 'password (leave blank if public)',
                type: 'password',
            }
        ],
        api: hostname + '/api/rooms/create',
        created: () => {
            let button = <HTMLButtonElement>document.createElement('button');
            button.textContent = 'cancel'
            button.addEventListener('click', () => {
                htmlElements.popupForm.innerHTML = '';
                htmlElements.popup.className = 'hidden';
            }, {once: true})
            htmlElements.popupForm.appendChild(button);
        },
        completed: () => {
            updateRooms();
        }
    },
    joinRoom: {
        title: 'join room',
        objects: [
            {
                name: 'roomId',
                label: 'room id',
            },
            {
                name: 'password',
                type: 'password',
                label: 'password (leave blank for none)'
            }
        ],
        api: hostname + '/api/rooms/join',
        created: () => {
            let button = <HTMLButtonElement>document.createElement('button');
            button.textContent = 'cancel'
            button.addEventListener('click', () => {
                htmlElements.popupForm.innerHTML = '';
                htmlElements.popup.className = 'hidden';
            }, {once: true})
            htmlElements.popupForm.appendChild(button);
        },
        completed: () => {
            updateRooms();
        }
    }
}