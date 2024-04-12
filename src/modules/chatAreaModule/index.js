export {default as ChatAreaModule} from'./chatAreaModule.hbs?raw';

import handleMenuClick from './helpers/menuHeaderHandler'
handleMenuClick();

import inputAtachHandler from './helpers/inputAttchHandler';
inputAtachHandler();

import handleAddUserClick from './helpers/inputAddUserHandler';
handleAddUserClick();

import handleDeleteUserClick from './helpers/inputDeleteUserHandler';
handleDeleteUserClick();
