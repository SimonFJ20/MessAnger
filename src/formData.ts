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
            displayForm('login')
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
        completed: () => {}
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
        completed: () => {},
    }
}

/* const createLoginForm = () => {
    const inputForm = new InputForm('login', '/api/users/login');

    return inputForm
}
const createRegisterForm = () => {}
const createCreateRoomForm = () => {}
const createJoinRoomForm = () => {}

export class InputForm {
    public title: string;
    public objects: object[];
    public apiRoute: string;

    public constructor(title: string, apiRoute: string) {
        this.title = title;
        this.objects = [];
        this.apiRoute = apiRoute;
    }

    public created?: () => void;
    public completed?: () => void;
} */