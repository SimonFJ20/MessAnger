import { post } from './ajax'
import { htmlElements } from './dom'
import { formData } from './formData'

export const displayForm = (name: string, message?: string, roomIdForJoinClick?: string) => {
    htmlElements.popup.className = '';
    if (!formData[name]) {
        htmlElements.popupForm.innerHTML = `form inputs of name ${name} not available.`;
        console.error(`form inputs of name ${name} not available.`);
    }
    htmlElements.popupForm.innerHTML = formData[name].title + (message ? '\n' + message : '');

    let formInputs = formData[name].objects;
    let inputObjects: { [key: string] : HTMLInputElement} = {}

    for (let i = 0; i < formInputs.length; i++) {
        let tempId = `temp-${formInputs[i].name}-(${Math.random()})`

        let label = <HTMLLabelElement>document.createElement('label');
        label.htmlFor = tempId;
        label.textContent = formInputs[i].label || formInputs[i].name;

        let inputElement = <HTMLInputElement>document.createElement('input');
        inputElement.id = tempId;
        inputElement.placeholder = '...';
        inputElement.type = formInputs[i].type || 'text';

        // af simon til at join
        if(name === 'joinRoom' && formInputs[i].name === 'roomId') inputElement.value = roomIdForJoinClick || '';

        htmlElements.popupForm.append(label, inputElement);
        inputObjects[formInputs[i].name] = inputElement;
    }

    if (formData[name].created)
        formData[name].created();

    // submit button
    
    let submitButton = <HTMLButtonElement>document.createElement('button');
    submitButton.textContent = formData[name].title;
    htmlElements.popupForm.appendChild(submitButton)

    submitButton.addEventListener('click', () => {
        let data: { [field: string]: any } = {
            token: sessionStorage.getItem('token'),
        };
        for (let field in inputObjects) {
            data[field] = inputObjects[field].value
        }

        // af simon, til at fixe /rooms/create
        if(formData[name].api === 'https://www.simonfj20.site/api/rooms/create') {
            const tempData = {
                token: sessionStorage.getItem('token'),
                name: data['name'],
                description: data['description'] || '',
                status: data['status'] || 'public',
                password: data['status'] === 'private' ? data['password (leave blank if public)'] : ''
            }
            data = tempData;
        }

        post(formData[name].api, data, (response: any) => {
            if (!response.success) {
                return displayForm(name, response.response)
            }

            htmlElements.popup.className = "hidden";
            if (formData[name].completed)
                return formData[name].completed(response);
        })
    }, {once: true})

    return true;
}

export const displayText = (text: string, label?: string) => {
    htmlElements.popup.className = '';
    htmlElements.popupForm.innerHTML = (label ? label + '\n' : '') + text

    let button = <HTMLButtonElement>document.createElement('button');
    button.textContent = 'exit'
    button.addEventListener('click', () => {
        htmlElements.popupForm.innerHTML = '';
        htmlElements.popup.className = 'hidden';
    }, {once: true})
    htmlElements.popupForm.appendChild(button);
}