import * as Pages from '../pages/index.ts'
import * as UIs from '../ui/index.ts';
import * as Components from '../components/index.ts';
import * as Modules from '../modules/index.ts';
import Handlebars from 'handlebars';

interface PageComponent {
  new (props: {}): {
    getContent: () => HTMLElement;
  };
}

const pages: { [key: string]: [PageComponent, {}] } = {
  'nav': [ Pages.Navigation, {}],
  'loginPage': [Pages.LoginPage, {}],
  'signInPage': [Pages.SignInPage, {}],
  'errorPage404': [Pages.ErrorPage404, {}],
  'errorPage500': [Pages.ErrorPage500, {}],
  'chatPage': [Pages.ChatPage, {}],
  'profilePage': [Pages.ProfilePageMain, {}],
  'profilePageCP': [Pages.ProfilePageCP, {}],
  'profilePageCD': [Pages.ProfilePageCD, {}],
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
  const [Source, context] = pages[page];
  const container = document.getElementById('app')!;

  if (typeof Source === "function") {
    const pageInstance = new Source(context);
    container.innerHTML = '';
    container.append(pageInstance.getContent());
    return;
  }

  container.innerHTML = Handlebars.compile(Source)(context);
}


document.addEventListener('click', e => {
  
  const target = e.target as HTMLElement;
  const page = target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});


