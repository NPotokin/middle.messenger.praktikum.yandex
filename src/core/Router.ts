import Block from './Block.ts';
import Route from './Route.ts';
import store from './Store.ts';

class Router {
  private static __instance: Router;
  public routes: Route[] = [];
  public history: History;
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

    Router.__instance = this; //tested
  }

  use(pathname: string, block: typeof Block): Router { //tested
    const route = new Route(pathname, block, { rootQuery: this._rootQuery });
    this.routes.push(route);
    return this;
  }

  protected isAuthenticated(): boolean {
    return !!store.getState().user;
  }

  start() {
    window.onpopstate = ((event: { currentTarget: { location: { pathname: string; }; }; }) => {
      if (!this.isAuthenticated()
        && event.currentTarget.location.pathname !== '/login'
        && event.currentTarget.location.pathname !== '/'
        && event.currentTarget.location.pathname !== '/error404'
        && event.currentTarget.location.pathname !== '/error500'
        && event.currentTarget.location.pathname !== '/sign-up') {
        window.router.go('/login');
        return;
      }
      if (this.isAuthenticated()
        && (event.currentTarget.location.pathname === '/login'
        || event.currentTarget.location.pathname === '/sign-up'
        || event.currentTarget.location.pathname === '/')) {
        window.router.go('/messenger');
        return;
      }
      this._onRoute(event.currentTarget.location.pathname);
    }).bind(this);

    if (!this.isAuthenticated()
      && window.location.pathname !== '/login'
      && window.location.pathname !== '/error404'
      && window.location.pathname !== '/error500'
      && window.location.pathname !== '/sign-up') {
      window.router.go('/login');
      return;
    }
    if (this.isAuthenticated()
      && (window.location.pathname === '/login'
      || window.location.pathname === '/sign-up'
      || window.location.pathname === '/')) {
      window.router.go('/messenger');
      return;
    }
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
    const route = this.routes.find(route => route.match(pathname));
    if (!route){
      return this.routes.find(route => route.match('*'));
    }
    return route;
  }

  back(): void {
    this.history.back();
  }

  forward(): void {
    this.history.forward();
  }

}

export default Router;
