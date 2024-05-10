import { ChatAPI } from '../api/chatApi.ts';
import store from '../core/Store.ts';

class ChatController{
  public static async createNewChat(data: Record<string, unknown>){
    const xhr = await ChatAPI.newChat(data);
    if(xhr.status === 200){
      const chatData = JSON.parse(xhr.responseText);
      console.log('new chat created successfully:', chatData);
    } else {
      console.log('error creating chat');
    }
  }

  public static async getChatsSetChats(){
    const xhr = await ChatAPI.allChatsData();
    if(xhr.status === 200){
      const allChatsData = JSON.parse(xhr.responseText);
      store.setChats(allChatsData);
      console.log('All chats data now in store');
    } else {
      console.log('Error downloading All chats data');
    }
  }
}

export default ChatController;
