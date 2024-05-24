import { JSDOM } from 'jsdom';
import 'mock-local-storage';

const jsdom = new JSDOM('<body></body>', {
  url: 'http://localhost/3000',
});

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
global.window.onpopstate = jsdom.window.onpopstate;

