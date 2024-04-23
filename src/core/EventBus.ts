type Listener = (...args: unknown[]) => void;

interface ListenersMap {
  [event: string]: Listener[];
}

export default class EventBus {
  private listeners: ListenersMap;

  constructor() {
    this.listeners = {};
  }

  on(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event].push(callback);
  }

  off(event: string, callback: Listener): void {
    if (!this.listeners[event]) {
      throw new Error(`No event found: ${event}`);
    }
    this.listeners[event] = this.listeners[event].filter(listener => listener !== callback);
  }

  emit(event: string, ...args: unknown[]): void {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event].forEach(listener => {
      listener(...args);
    });
  }
}
