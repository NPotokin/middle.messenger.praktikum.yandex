import Block from '../../core/Block.ts';
import { Button} from '../../ui/index.ts';
import {Input} from '../../ui/index.ts';
import navigate from '../../utils/navigate.ts';
import loginValidator from '../../utils/inputValidators/loginValidator.ts';
import passwordValidator from '../../utils/inputValidators/passwordValidator.ts';
import { ErrorLine } from '../../ui/index.ts';

interface LoginModuleInterface{
  error?:string,
  ErrorText?: string,
  formAction?: string,
}
export default class LoginModule extends Block {
  constructor(props:LoginModuleInterface){
    super({
      ...props,
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),
    });
  }

  init(){
    const onChangeLoginBind = loginValidator.bind(this);
    const onChangePasswordBind = passwordValidator.bind(this);
    const loginButtonClickBind = this.onLogin.bind(this);
    const navigateBind = navigate.bind(this);

    const LoginInput = new Input({
      label: 'Логин',
      inputId: 'login',
      inputType: 'text',
      inputName: 'login',
      onBlur: onChangeLoginBind,

    });

    const PasswordInput = new Input({
      inputId: 'password',
      inputType: 'password',
      inputName: 'password',
      label: 'Пароль',
      onBlur: onChangePasswordBind,
    });

    const LogInButton = new Button({
      onClick: loginButtonClickBind,
      label: 'Авторизоваться',
      type: 'primary',
    });

    const SignInButton = new Button({
      label: 'Нет аккаунта?',
      type: 'link',
      onClick: () => navigateBind('signInPage'),
    });

    this.children = {
      ...this.children,
      LoginInput,
      PasswordInput,
      LogInButton,
      SignInButton,
    };
  }

  onLogin(e: Event) {
    e.preventDefault();
    const inputError = this.children.LoginInput.props.error;
    const passwordError = this.children.PasswordInput.props.error;


    if (!inputError && !passwordError) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        login: this.props.login,
        password: this.props.password,
      });
      navigate('chatPage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(): string {
    return(`
        <div class="login">
            <div class="login__modal">
                <h1 class="login__title">Вход</h1>
                <form 
                action="{{formAction}}" 
                class="login__form">
                    {{{LoginInput}}}
                    {{{PasswordInput}}}
                    {{{LogInButton}}}
                    {{{ErrorLine}}}
                    {{{SignInButton}}}
                </form>
            </div>
        </div>
        `);
  }
}