import Block from './Block.ts';
import Route from './Route.ts';

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private history: History;
  private _currentRoute: Route | null;
  private _rootQuery: string;

  constructor(rootQuery?: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    this._rootQuery = rootQuery ?? '#app';

    Router.__instance = this;
  }

  use(pathname: string, block: typeof Block): Router {
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  start() {
    window.onpopstate = ((event: { currentTarget: { location: { pathname: string; }; }; }) => {
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);
    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string): void {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  go(pathname: string): void {
    this.history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname));
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }
}

export default Router;
