import { io } from "socket.io-client";
import { SET_CONNECTED_USERS, SET_ID, SET_ROOM, SET_CONNECTED_CLIENT, SET_IP } from "./actions";

export const initialState = {
    socket: null,
    currentRoom: "",
    connectedUsers: [],
    connectedClient: ""
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ID:
            return {
                ...state,
                id: action.payload
            }
        case SET_CONNECTED_USERS:
            return {
                ...state,
                connectedUsers: action.payload
            }
        case SET_ROOM:
            return {
                ...state,
                currentRoom: action.payload
            }
        case SET_CONNECTED_CLIENT:
            return {
                ...state,
                connectedClient: action.payload
            }
        case SET_IP:
            console.log(action.payload)
            return {
                ...state,
                socket: io(`http://${action.payload}:5000`)
            };
        default:
            return state;
    }
}

export default reducer;