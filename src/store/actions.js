export const SET_ID = 'set_id';
export const SET_CONNECTED_USERS = "set_connected_users";
export const SET_ROOM = "set_room";
export const SET_CONNECTED_CLIENT = "set_connected_client";
export const SET_IP = "set_ip";

export const setId = (id) => ({
    type: SET_ID,
    payload: id
})

export const setConnectedUsers = (connectedUsers) => ({
    type: SET_CONNECTED_USERS,
    payload: connectedUsers
})

export const setRoom = (room) => ({
    type: SET_ROOM,
    payload: room
})

export const setConnectedClient = (id) => ({
    type: SET_CONNECTED_CLIENT,
    payload: id
})

export const setIp = (ip) => ({
    type: SET_IP,
    payload: ip
})