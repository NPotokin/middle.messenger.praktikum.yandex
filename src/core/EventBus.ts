export default class EventBus<E extends string> {
  listeners: {[key in E]?: Function[]} = {};

  constructor() {
    this.listeners = {};
  }

  on<F extends (...args: Parameters<F>) => void >(event: E, callback: F) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }
    this.listeners[event]!.push(callback);
  }

  off<F extends (...args: Parameters<F>) => void >(event: E, callback: F) {
    if (!this.listeners[event]) {
      throw new Error(`No event found: ${event}`);
    }
    this.listeners[event] = this.listeners[event]!.filter(listener => listener !== callback);
  }

  emit<F extends (...args: unknown[]) => void >(event: E, ...args: Parameters<F>) {
    if (!this.listeners[event]) {
      return;
    }
    this.listeners[event]!.forEach(function (listener) {
      listener(...args);
    });
  }
}
