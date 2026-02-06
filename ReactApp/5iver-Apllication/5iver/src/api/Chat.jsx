import api from "./axios"

export const startChat = (receiverId) => api.post("/chats/startChat", null,
    {
    params: {receiverId}
    });

export const getUserChats = (userId) => api.get(`/chats/getChats/${userId}`);


export const sendMessage = (chatId, messageContent) =>
  api.post(`/chats/${chatId}/send`, {
    content: messageContent
  });

export const findChat = (chatId) => api.get(`/chats/findChat/${chatId}`);


export const getMessages = (chatId) => api.get(
    `/chats/${chatId}/messages`
)

 