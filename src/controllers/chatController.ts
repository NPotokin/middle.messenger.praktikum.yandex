import { ChatAPI } from '../api/chatApi.ts';
import store from '../core/Store.ts';

class ChatController {
  public static async createNewChat(data: Record<string, unknown>) {
    try {
      const xhr = await ChatAPI.newChat(data);
      if (xhr.status === 200) {
        const chatData = JSON.parse(xhr.responseText);
        console.log('New chat created successfully:', chatData);
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error creating chat');
    }
  }

  public static async deleteChat(data: Record<string, unknown>) {
    try {
      const xhr = await ChatAPI.deleteChat(data);
      if (xhr.status === 200) {
        const chatData = JSON.parse(xhr.responseText);
        console.log('Chat Deleted:', chatData);
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error deleting chat');
    }
  }

  public static async changeChatAvatar(data: FormData) {
    try {
      const xhr = await ChatAPI.chatChangeAvatar(data);
      if (xhr.status === 200) {
        const chatData = JSON.parse(xhr.responseText);
        store.setChats(chatData)
        console.log('Chat avatar updated successfully:', chatData);
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error updating avatar');
    }
  }

  public static async getChatsSetChats() {
    try {
      const xhr = await ChatAPI.allChatsData();
      if (xhr.status === 200) {
        const allChatsData = JSON.parse(xhr.responseText);
        store.setChats(allChatsData);
        console.log('All chats data now in store');
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error downloading all chats data');
    }
  }

  public static async addUser(data: Record<string, unknown>) {
    try {
      const xhr = await ChatAPI.findUserByLogin(data);
      if (xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        console.log('User found:', userData);
        const chatId = store.getState().chats?.find((chat) => chat.isActive)?.id;
        if (chatId !== undefined) {
          const userId = userData[0].id;
          await ChatAPI.addUserToChat({ users: [userId], chatId: chatId });
          console.log('User added to the chat');
        } else {
          console.log('Active chat ID is undefined.');
        }
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error adding user to the chat');
    }
  }

  public static async deleteUser(data: Record<string, unknown>) {
    try {
      const xhr = await ChatAPI.findUserByLogin(data);
      if (xhr.status === 200) {
        const userData = JSON.parse(xhr.responseText);
        console.log('User found:', userData);
        const chatId = store.getState().chats?.find((chat) => chat.isActive)?.id;
        if (chatId !== undefined) {
          const userId = userData[0].id;
          await ChatAPI.deleteUserFromChat({ users: [userId], chatId: chatId });
          console.log('User deleted from the chat');
        } else {
          console.log('Active chat ID is undefined.');
        }
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error deleting user from the chat');
    }
  }

  public static async getTokenSetToken(id: number) {
    try {
      const xhr = await ChatAPI.getChatToken(id);
      if (xhr.status === 200) {
        const token = JSON.parse(xhr.responseText);
        console.log('Token:', token);
        store.setToken(token);
      } else {
        throw xhr;
      }
    } catch (xhr) {
      this.handleError(xhr, 'Error getting token');
    }
  }

  private static handleError(xhr: XMLHttpRequest, defaultMessage: string) {
    console.error(defaultMessage, xhr.statusText);
    switch (xhr.status) {
    case 400:
      alert('Bad request: Please check your data and try again.');
      break;
    case 401:
      alert('Unauthorized: Please login again.');
      window.router.go('/login');
      break;
    case 500:
      window.router.go('/error500');
      break;
    default:
      alert('An unexpected error occurred. Please try again later.');
      break;
    }
  }
}

export default ChatController;
