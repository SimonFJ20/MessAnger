import { post } from './ajax'
import { htmlElements } from './htmlElements'
const formInputsList: { [name: string] : { [field: string] : string}[] } = {
    login: [
        {
            name: 'username',
        },
        {
            name: 'password',
            type: 'password',
        }
    ],
    register: [
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
    createRoom: [
        {
            name: 'name',
        },
        {
            name: 'password',
            type: 'password',
        }
    ],
    joinRoom: [
        {
            name: 'password',
            type: 'password',
        }
    ],
}

const formApiPath: { [key: string] : string} = {
    login: '/api/users/login',
    register: '/api/users/register',
    createRoom: '/api/rooms/create',
    joinRoom: '/api/rooms/join',
}

export const displayForm = (name: string, message?: string) => {
    htmlElements.popup.className = "";

    let inputObjects: { [key: string] : HTMLElement} = {}

    htmlElements.popupForm.innerHTML = message || '';
    if (!formInputsList[name]) {
        htmlElements.popupForm.innerHTML = `form inputs of name ${name} not available.`;
        console.error(`form inputs of name ${name} not available.`);
    }

    let formInputs = formInputsList[name];
    for (let i = 0; i < formInputs.length; i++) {
        let tempId = `temp-${formInputs[i]}-(${Math.random()})`

        let label = <HTMLLabelElement>document.createElement('label');
        label.htmlFor = tempId;
        label.textContent = formInputs[i].name;

        let inputElement = <HTMLInputElement>document.createElement('input');
        inputElement.id = tempId;
        inputElement.placeholder = '...';
        inputElement.type = formInputs[i].type || 'text',

        htmlElements.popupForm.append(label, inputElement);
        inputObjects[formInputs[i].name] = inputElement;
    }
    
    let submitButton = <HTMLButtonElement>document.createElement('button');
    submitButton.textContent = 'submit';
    htmlElements.popupForm.appendChild(submitButton)

    submitButton.addEventListener('click', () => {
        console.log('clicked')
        let data: { [field: string]: any } = {};
        for (let field in inputObjects) {
            data[field] = inputObjects[name]
        }

        post('url', data, (response: any) => {
            if (!response.success) {
                console.error(response.response)
                displayForm(name, response)
                return
            }

            htmlElements.popup.className = "hidden";

        })
    }, {once: true}) // handles cleanup for me to prevent memory leaks.
}