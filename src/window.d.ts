// global.d.ts
import Router from './core/Router.ts'; 

declare global {
  interface Window {
    router: Router;
  }
}
