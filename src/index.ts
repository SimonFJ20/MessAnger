import { hostname, post } from "./ajax";
import { htmlElements } from "./dom";
import { useUserHandler } from "./userHandler";
import { displayForm } from "./popupHandler";
import { useRoomHandler } from "./roomHandler";

const start = () => {
    if (sessionStorage.getItem('token')) {
        post(hostname + '/api/users/checktoken', {token: sessionStorage.getItem('token')}, (response: any) => {
            if (!(response.success === true && response.response === 'success')) {
                displayForm('login', response.response === 'expired' ? 'session expired' : undefined);
            } else {
                useRoomHandler();
                useUserHandler();
                htmlElements.popup.className = 'hidden';
            }
        })
    } else {
        displayForm('login')
    }
}

start();