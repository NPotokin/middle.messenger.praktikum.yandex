import Router from './core/Router.ts';
import * as Pages from './pages/index.ts';

const router = new Router('#app');
window.router = router;

router
  .use('/', Pages.LoginPage)
  .use('/sign-up', Pages.SignInPage)
  .use('/login', Pages.LoginPage)
  .use('/messenger', Pages.ChatPage)
  .use('/settings', Pages.ProfilePageMain)
  .use('/settings-change-data', Pages.ProfilePageCD)
  .use('/settings-change-password', Pages.ProfilePageCP)
  .use('*', Pages.ErrorPage404)
  .use('/error500', Pages.ErrorPage500);
router.start();

