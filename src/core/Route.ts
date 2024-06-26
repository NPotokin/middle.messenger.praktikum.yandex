import isEqual from '../utils/isEqual.ts';
import Block from './Block.ts'; // Assuming Block is a class you have defined elsewhere.

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

  navigate(pathname: string): void { //tested
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void { // tested - CHECK!
    if (this._block) {
      this._block.hide();
    }
  }

  match(pathname: string): boolean { //tested
    return isEqual(pathname, this._pathname);
  }

  _renderDom(query: string, block: Block) { //no test - private
    const root = document.querySelector(query);
    root!.append(block.getContent());
  }

  render() { // tested - CHECK
    if (!this._block) {
      this._block = new this._blockClass({});
      this._renderDom(this._props.rootQuery, this._block);
      return;
    }

    this._block.show();
  }
}
