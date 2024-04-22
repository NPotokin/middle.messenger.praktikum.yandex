import Block from '../../core/Block';
import { Button} from '../../ui';
import {Input} from '../../ui';
import navigate from '../../utils/navigate';
import loginValidator from '../../utils/inputValidators/loginValidator';
import passwordValidator from '../../utils/inputValidators/passwordValidator';
import { ErrorLine } from '../../ui';

export default class LoginModule extends Block {
  constructor(props){
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

  onLogin(e) {
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