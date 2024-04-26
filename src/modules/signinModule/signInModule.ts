import Block from '../../core/Block.ts';
import SignInForm from './signInForm.ts';

interface SignInModuleinterface{}
export default class SignInModule extends Block{
  constructor(props:SignInModuleinterface){
    super({
      ...props,
      SignInForm: new SignInForm({...props})
    });
  }

  

  render(): string {
    return(`
        <div class="signin">
        <div class="signin__modal">
            <h1 class="signin__title">Регистрация</h1>
            {{{SignInForm}}}
        </div>
    </div>
        `);

  }
}
