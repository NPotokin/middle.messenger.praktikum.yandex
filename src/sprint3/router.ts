import Block from "../core/Block.ts";
import Route from "./route.ts";
import { ErrorPage404 } from "../pages/index.ts";

export default class Router {
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

    start(): void {
        window.onpopstate = event => {
            this._onRoute((event.currentTarget as Window).location.pathname);
        };

        this._onRoute(window.location.pathname);
    }

    private _onRoute(pathname: string): void {
        const route = this.getRoute(pathname);
        if (!route) {
            // If no matching route is found, redirect to ErrorPage404
            this._currentRoute = new Route(pathname, ErrorPage404, { rootQuery: this._rootQuery });
            this._currentRoute.render();
            return;
        }
        if (this._currentRoute) {
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
