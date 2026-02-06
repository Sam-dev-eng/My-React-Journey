import sockjs from "sockjs-client";
import { Client } from "@stomp/stompjs";

let client = null;


export const connectWebSocket = (token, onMessage) => {
    client = new Client({
        webSocketFactory: () => sockjs("http://localhost:8080/webSockets"),
        connectHeaders: {
            Authorization : `Bearer ${token}`
        },
        onConnect: (frame) => {
            console.log("connected "+frame)
            client.subscribe("/user/queue/messages", (msg) => {
                onMessage(JSON.parse(msg.body));
            });
        },
        onStompError: (frame) => {
            console.error("Broker reported error: " + frame.headers['message']);
        }
    });
    client.activate();
}

export const sendMessageWs = (payload) => {
    if (!client || !client.connected) {
        console.warn("ws client not connected. message not sent ")
        return;
    }
    
    client.publish({
        destination: "/app/chat.send",
        body: JSON.stringify(payload),
    })
}

