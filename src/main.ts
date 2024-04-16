//@ts-check
import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';
import * as Modules from './modules';
import * as UIs from './ui';


const pages = {
  'nav': [ Pages.Navigation],
  'loginPage': [Pages.LoginPage],
  'signInPage': [Pages.SignInPage],
  'errorPage': [Pages.ErrorPage],
  'chatPage': [Pages.ChatPage],
  'addUser': [Pages.AddUser],
  'uploadAvatar': [Pages.UploadAvatar],
  'uploadedAvararError': [Pages.UploadAvatarError],
  'noFile': [Pages.UploadAvatarNoFile],
  'succesUploadAvatar': [Pages.UploadedAvatar],
  'deleteUserModal': [Pages.DeleteUserModal],
  'preAddDeleteUserModal': [Pages.PreAddDeleteUser],
  'attachModal': [Pages.Attach],
  'profile': [Pages.Profile],
  'profileChangeData': [Pages.ProfileChangeData],
  'profileChangePassword': [Pages.ProfileChangePassword],
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

function navigate(page: string) {
  //@ts-ignore
  const [ source, context ] = pages[page];
  const container = document.getElementById('app')!;

  if(source instanceof Object) {
    const page = new source(context);
    container.innerHTML = '';
    container.append(page.getContent());
    // page.dispatchComponentDidMount();
    return;
  }

  container.innerHTML = Handlebars.compile(source)(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  //@ts-ignore
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});