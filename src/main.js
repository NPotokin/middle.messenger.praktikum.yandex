import Handlebars from 'handlebars';
import * as Components from './components';
import * as Pages from './pages';


const pages = {
  'nav': [ Pages.Navigation],
  'emptyChat': [Pages.EmptyChat],
  'chat': [Pages.Chat],
  'error404': [Pages.Error404],
  'error500': [Pages.Error500],
  'emptyLogin': [Pages.EmptyFields],
  'filledLogin': [Pages.FilledFields],
  'wrongLogin': [Pages.WrongLogin],
  'wrongPassword': [Pages.WrongPassword],
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
  'signIn': [Pages.SignIn]
};

Object.entries(Components).forEach(([ name, component ]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
    const [source, context] = pages[page];
    const container = document.getElementById('app');
    container.innerHTML = Handlebars.compile(source)(context);
  }
  

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    e.preventDefault();
    e.stopImmediatePropagation();
  }
});