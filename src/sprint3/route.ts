import isEqual from './isEqual.ts'
import Block from "../core/Block.ts"; // Assuming Block is a class you have defined elsewhere.
import { render } from './render.ts';

interface RouteProps {
  rootQuery: string;
}

export default class Route {
  private _pathname: string;
  private _blockClass: typeof Block;
  private _block: Block | null;
  private _props: RouteProps;

  constructor(pathname: string, view: typeof Block, props: RouteProps) {
    this._pathname = pathname;
    this._blockClass = view;
    this._block = null;
    this._props = props;
  }

  navigate(pathname: string): void {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean {
    return isEqual(pathname, this._pathname);
  }

  render(): void {
    if (!this._block) {
      this._block = new this._blockClass({}); // Assuming Block is instantiated here.
      render(this._props.rootQuery, this._block); // Assuming render is a function that takes a query selector and a Block instance.
      return;
    }

    this._block.show();
  }
}
