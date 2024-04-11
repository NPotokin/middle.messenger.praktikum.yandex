export {default as ErrorModule} from './errorModule.hbs?raw'
import Handlebars from 'handlebars'


Handlebars.registerHelper('error', () => {
    return {error404: true}
})


  
