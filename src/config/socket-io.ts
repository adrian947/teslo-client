import { Manager } from "socket.io-client"

export const connectToServer = ()=>{

    const manager = new Manager(`${import.meta.env.VITE_BASE_URL_BACKEND}/socket.io/socket.io.js`)

    const socket = manager.socket('/');
    console.log("🚀 ~ socket :", socket )

}