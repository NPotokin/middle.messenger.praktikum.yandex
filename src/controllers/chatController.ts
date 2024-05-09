import { ChatAPI } from "../api/chatApi.ts";
import store from "../core/Store.ts";

class ChatController{
    public static async createNewChat(data: Record<string, unknown>){
        const xhr = await ChatAPI.newChat(data)
        if(xhr.status === 200){
            const chatData = JSON.parse(xhr.responseText);
            store.setChat(chatData);
            console.log('Chat data updated successfully:', chatData);
        } else {
            console.log("error saving chat to store")
        }
    }
}

export default ChatController;