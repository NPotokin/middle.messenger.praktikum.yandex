import ChatController from '../../controllers/chatController.ts';
import SignupController from '../../controllers/signupController.ts';
import Block from '../../core/Block.ts';
import { Button, ErrorLine, Input } from '../../ui/index.ts';
import loginValidator from '../../utils/inputValidators/loginValidator.ts';
import passwordValidator from '../../utils/inputValidators/passwordValidator.ts';

interface LoginFormInterface{
    onBlur?: (e:Event) => void;
    ErrorText?: string,
    formAction?: string,
}

export default class LoginForm extends Block{
  constructor(props: LoginFormInterface){
    super({
      ...props,
      formAction: 'POST',
      events:{
        submit: (e: Event) => this.onLogin(e),
      },
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),
    });
  }

  init(){
    const onChangeLoginBind = loginValidator.bind(this);
    const onChangePasswordBind = passwordValidator.bind(this);

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
      label: 'Авторизоваться',
      type: 'primary',
      buttonType: 'submit',
    });

    const SignInButton = new Button({
      label: 'Нет аккаунта?',
      type: 'link',
      onClick: () => window.router.go('/sign-up'),
    });

    this.children = {
      ...this.children,
      LoginInput,
      PasswordInput,
      LogInButton,
      SignInButton,
    };
  }

  async onLogin(e: Event) {
    e.preventDefault();
    const inputError = this.children.LoginInput.props.error;
    const passwordError = this.children.PasswordInput.props.error;


    if (!inputError && !passwordError && this.props.login && this.props.password) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        login: this.props.login,
        password: this.props.password,
      });

      const userCredentials = {
        login: this.props.login,
        password: this.props.password,
      };

      await SignupController.loginUser(userCredentials);
      await ChatController.getChatsSetChats();
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render():string {
    return(`
        <form 
        action="{{formAction}}" 
        class="login__form">
            {{{LoginInput}}}
            {{{PasswordInput}}}
            {{{LogInButton}}}
            {{{ErrorLine}}}
            {{{SignInButton}}}
        </form>
        `);
  }


}
