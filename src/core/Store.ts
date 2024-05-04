import EventBus from './EventBus.ts';

export enum StoreEvents {
  Updated = 'Updated'
}

export interface User{
  id: number,
  first_name: string,
  second_name: string,
  display_name?: string,
  phone: string,
  login: string,
  avatar?: string,
  email: string,
}

interface AppState{
  user?: User
}

export class Store extends EventBus<StoreEvents> {
  private state: AppState = {};
  private static __instance: Store

  constructor(defaultState:{}) {
    if (Store.__instance) {
      return Store.__instance;
    }
    super();

    this.state = defaultState;
    this.set(defaultState);

    Store.__instance = this;
  }

  public getState(): AppState {
    return this.state;
  }

  public setUser(user: User){
    this.set({user})
  }

  private set(nextState: Partial<AppState>) {
    const prevState = { ...this.state };
    this.state = { ...this.state, ...nextState };
    this.emit(StoreEvents.Updated, prevState, this.state);
  }
}
