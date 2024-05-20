import {JSDOM} from 'jsdom';

const jsdom = new JSDOM('<body id="app"></body>');

global.window = jsdom.window;
global.document = jsdom.window.document;
global.Node = jsdom.window.Node;
global.MouseEvent = jsdom.window.MouseEvent;
