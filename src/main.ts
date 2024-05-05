import Router from './core/Router.ts';
import * as Pages from './pages/index.ts';

const router = new Router('#app');
window.router = router;

router
  .use('/', Pages.SignInPage)
  .use('/signin', Pages.SignInPage)
  .use('/login', Pages.LoginPage)
  .use('/chat', Pages.ChatPage)
  .use('/profile', Pages.ProfilePageMain)
  .use('/profile-change-data', Pages.ProfilePageCD)
  .use('/profile-change-password', Pages.ProfilePageCP)
  .use('/error404', Pages.ErrorPage404)
  .use('/error500', Pages.ErrorPage500);
router.start();

