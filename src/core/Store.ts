import EventBus from './EventBus.ts';

export enum StoreEvents {
  Updated = 'Updated'
}

export interface User {
  id?: number;
  first_name: string;
  second_name: string;
  display_name?: string;
  phone: string;
  login: string;
  avatar?: string;
  email: string;
}

export interface ChatData {
  id?: number,
  title?: string,
  avatar?: string,
  unread_count?: number,
  created_by?: number,
  last_message?: {
    user?: User,
    time?: string,
    content?: string
  },
  isActive?: boolean,
}
export interface SocketMessage{
  id?: number,
  chat_id?: number,
  user_id?: number,
  content: string,
  time?: string,
}

export interface AppState {
  user?: User;
  chats?: ChatData[];
  token?: string, 
  messages: SocketMessage[],
}

class Store extends EventBus<StoreEvents> {
  private static __instance: Store;
  private state: AppState;

  constructor(defaultState: Partial<AppState>) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    const storedState = sessionStorage.getItem('appState');
    this.state = storedState ? JSON.parse(storedState) : defaultState;
    this.set(this.state);

    Store.__instance = this;
  }

  public getState(): AppState {
    return this.state;
  }

  public setUser(user: User) {
    this.set({ user });
  }

  public setChats(chats: ChatData[]) {
    this.set({ chats });
  }

  public setMessages(messages: SocketMessage[]) {
    this.set({ messages });
  }

  public setToken(token: string){
    //@ts-expect-error
    this.set(token);
  }

  public setActiveChat(chatId: number) {
    const chats = this.state.chats?.map(chat => ({
      ...chat,
      isActive: chat.id === chatId,
    })) ?? [];
    this.set({ chats });
  }

  private set(nextState: Partial<AppState>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    sessionStorage.setItem('appState', JSON.stringify(this.state));
    this.emit(StoreEvents.Updated, prevState, this.state);
  }
}

const store = new Store({});

export default store;
