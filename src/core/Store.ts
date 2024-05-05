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

export interface AppState {
  user?: User;
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

  private set(nextState: Partial<AppState>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    sessionStorage.setItem('appState', JSON.stringify(this.state)); 
    this.emit(StoreEvents.Updated, prevState, this.state);
  }
}

const store = new Store({})

export default store;