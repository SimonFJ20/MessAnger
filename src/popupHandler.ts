import { post } from './ajax'
import { htmlElements } from './dom'
import { formData } from './formData'

export const displayForm = (name: string, message?: string) => {
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
        inputElement.type = formInputs[i].type || 'text',

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