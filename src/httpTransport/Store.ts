import EventBus from "../core/EventBus.ts";

export enum StoreEvents {
    Updated = 'updated',
  }

class Store extends EventBus<StoreEvents>{
    private state: Indexed = {};

  public getState() {
    return state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
  };
}

export default new Store()