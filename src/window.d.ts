// global.d.ts
import Router from './core/Router.ts'; 
import  {Store}  from './core/Store.ts';

declare global {
  interface Window {
    router: Router;
    store: Store;
  }
}
