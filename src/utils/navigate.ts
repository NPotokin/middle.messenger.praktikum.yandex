import * as Pages from '../pages';
import * as UIs from '../ui';
import * as Components from '../components';
import * as Modules from '../modules';
import Handlebars from 'handlebars';


const pages = {
  'nav': [ Pages.Navigation],
  'loginPage': [Pages.LoginPage],
  'signInPage': [Pages.SignInPage],
  'errorPage404': [Pages.ErrorPage404],
  'errorPage500': [Pages.ErrorPage500],
  'chatPage': [Pages.ChatPage],
  'profilePage': [Pages.ProfilePageMain],
  'profilePageCP': [Pages.ProfilePageCP],
  'profilePageCD': [Pages.ProfilePageCD],
};

Object.entries(UIs).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

Object.entries(Modules).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

export default function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}


document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});


