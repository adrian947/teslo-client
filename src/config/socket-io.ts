import { Manager, Socket } from "socket.io-client"

let socket: Socket

export const connectToServer = async () => {
    const manager = new Manager(`${import.meta.env.VITE_BASE_URL_BACKEND}/socket.io/socket.io.js`, {
        extraHeaders: {
            authentication: localStorage.getItem('token') as string
        }
    })
    socket?.removeAllListeners();
    socket = manager.socket('/');
    return socket
}



