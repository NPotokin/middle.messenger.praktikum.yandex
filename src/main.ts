
import Router from './sprint3/router.ts';
// import navigate from './utils/navigate.ts';
import * as Pages from './pages/index.ts'
// document.addEventListener('DOMContentLoaded', () => navigate('nav'));

const router = new Router()

router.use('/', Pages.ErrorPage404)
router.start()