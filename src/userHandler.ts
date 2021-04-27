import { hostname, post } from "./ajax"
import { htmlElements } from "./dom"
import { displayForm } from "./popupHandler"

export const useUserHandler = () => {
    if (sessionStorage.getItem('username')) htmlElements.usernameDisplay.textContent = sessionStorage.getItem('username');

    htmlElements.logOut.addEventListener('click', () => {
        if (sessionStorage.getItem('token')) {
            post(hostname + '/api/users/logout', {token: sessionStorage.getItem('token')}, () => {
                htmlElements.roomList.innerHTML = '';
                htmlElements.chatList.innerHTML = '';
                sessionStorage.removeItem('token')
                displayForm('login');
            })
        }
    })
}