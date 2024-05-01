
import Router from './sprint3/router.ts';
// import navigate from './utils/navigate.ts';
import * as Pages from './pages/index.ts'
// document.addEventListener('DOMContentLoaded', () => navigate('nav'));

const router = new Router()

router
    .use('/', Pages.SignInPage)
    .use('/signin', Pages.SignInPage)
    .use('/login', Pages.LoginPage)
    .use('/chat', Pages.ChatPage)
    .use('/profile', Pages.ProfilePageMain)
    .use('/profile-change-data', Pages.ProfilePageCD)
    .use('/profile-change-password', Pages.ProfilePageCP)
    .use('/error404', Pages.ErrorPage404)
    .use('/error500', Pages.ErrorPage500)
router.start()

export default router;