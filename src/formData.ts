import { htmlElements } from "./htmlElements";
import { displayForm } from "./popupHandler";
import { hostname } from './ajax';

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
            return sessionStorage.setItem('userToken', response.token)
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
                type: 'mail'
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
            },
            {
                name: 'password',
                type: 'password',
            }
        ],
        api: hostname + '/api/rooms/create',
    },
    joinRoom: {
        title: 'join room',
        objects: [
            {
                name: 'password',
                type: 'password',
            }
        ],
        api: hostname + '/api/rooms/join',
    }
}