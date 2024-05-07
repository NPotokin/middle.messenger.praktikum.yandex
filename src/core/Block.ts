import EventBus from './EventBus.ts';
import { nanoid } from 'nanoid';
import Handlebars from 'handlebars';


export interface ComponentInterface {
  [prop: string]: unknown;
  events?: { [eventName: string]: (e: Event) => void }
}

export interface BlockInterface {
  [key: string]: unknown;
  events?: { [key: string]: (e: Event) => void };
}

export default class Block  {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    // FLOW_CWU: 'flow:component-will-unmount',
    FLOW_RENDER: 'flow:render',
  };

  private _element: HTMLElement | null = null;
  private _meta: { tagName: string } | null = null;
  public _id: string = nanoid(6);
  private eventBus: () => EventBus<string>;
  public props: ComponentInterface;
  public children: Record<string, Block>;


  constructor(propsWithChildren: {}) {
    const eventBus = new EventBus();

    const {props, children} = this._getChildrenAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children as Record<string, Block>;

    this.eventBus = () => eventBus;

    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const {events = {}} = this.props as {events?: {[key: string]: EventListener}};

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  _removeEvents() {
    const {events = {}} = this.props as {events?: {[key: string]: EventListener}};

    Object.keys(events).forEach(eventName => {
      this._element?.removeEventListener(eventName, events[eventName]);
    });
  }

  _registerEvents(eventBus: EventBus<string>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    // eventBus.on(Block.EVENTS.FLOW_CWU, this._componentWillUnmount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _createResources() {
    if (this._meta) {
      const { tagName } = this._meta;
      this._element = this._createDocumentElement(tagName);
    } else {
      throw new Error('_meta is null. Cannot create resources.');
    }
  }

  _init() {
    this.init();

    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  init() {

  }

  _componentDidMount() {
    // this._checkInDom();
    this.componentDidMount(this.props); //this.props by me and questinable

    Object.values(this.children).forEach(child => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount(oldProps?: BlockInterface) {
    console.log(`CDM! oldProps: ${oldProps}`);
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: BlockInterface, newProps: BlockInterface) {
    const response = this.componentDidUpdate(oldProps, newProps);
    if (!response) {
      return;
    }
    console.log('Block _CDU render')
    this._render();
  }

  componentDidUpdate(oldProps?: BlockInterface, newProps?: BlockInterface) {
    // console.log(`CDU! old: ${oldProps}, new:${newProps}`);
    return true;
  }

  _getChildrenAndProps(propsAndChildren: {}) {
    const children: ComponentInterface ={};
    const props: ComponentInterface = {};


    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  // _checkInDom() {
  //   const elementInDOM = document.body.contains(this._element);

  //   if (elementInDOM) {
  //     setTimeout(() => this._checkInDom(), 1000);
  //     return;
  //   }

  //   this.eventBus().emit(Block.EVENTS.FLOW_CWU, this.props);
  // }

  // _componentWillUnmount() {
  //   this.componentWillUnmount();
  // }

  // componentWillUnmount() {}


  setProps = (nextProps: BlockInterface) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs = { ...this.props };

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    const fragment = this._createDocumentElement('template') as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    if(this._element){
      this._removeEvents();
    }

    const newElement = fragment.content.firstElementChild as HTMLElement;

    Object.values(this.children).forEach(child => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      stub?.replaceWith(child.getContent());
    });

    if (this._element) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement as HTMLElement;

    this._addEvents();
  }

  render() {}

  getContent() {
    return this.element as HTMLElement;
  }

  _makePropsProxy(props: ComponentInterface) {
    const self = this;

    return new Proxy(props, {
      get(target, prop:string) {
        const value = target[prop];
        return typeof value === 'function' ? value.bind(target) : value;
      },
      set(target, prop:string, value) {
        const oldTarget = {...target};
        target[prop] = value;

        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);
        return true;
      },
      deleteProperty() {
        throw new Error('Нет доступа');
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    this.getContent().style.display = 'block';
  }

  hide() {
    this.getContent().style.display = 'none';
  }
}
