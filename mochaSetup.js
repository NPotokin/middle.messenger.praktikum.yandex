import { JSDOM } from 'jsdom';

const jsdom = new JSDOM('<body></body>', {
  url: "http://localhost/3000"
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
// global.window.sessionStorage = jsdom.window.sessionStorage;
