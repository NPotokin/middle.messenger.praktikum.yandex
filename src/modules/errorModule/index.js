import Handlebars from 'handlebars';
export {default as ErrorModule} from './errorModule.hbs?raw';


Handlebars.registerHelper('error', () => {
  return {error404: true};
});


