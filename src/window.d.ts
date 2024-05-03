// global.d.ts
import Router from './sprint3/router.ts';  // Adjust the path as necessary

declare global {
  interface Window {
    router: Router;
  }
}
