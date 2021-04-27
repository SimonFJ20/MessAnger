import { htmlElements } from "./dom"
import { displayForm } from "./popupHandler"

export const useRoomHandler = () => {
    htmlElements.createRoom.addEventListener('click', () => {
        displayForm('createRoom')
    })
}