import Block from '../../core/Block.ts';
import LoginForm from './loginForm.ts';

interface LoginModuleInterface{}

export default class LoginModule extends Block {
  constructor(props:LoginModuleInterface){
    super({
      ...props,
      LoginFormComponent: new LoginForm({...props}),
    });
  }


  render(): string {
    return(`
        <div class="login">
            <div class="login__modal">
                <h1 class="login__title">Вход</h1>
                {{{LoginFormComponent}}}
            </div>
        </div>
        `);
  }
}
