import Block from '../../core/Block';
import { Button } from '../../ui';
import {Input} from '../../ui';
import navigate from '../utils/navigate';
import loginValidator from '../utils/inputValidators/loginValidator';
import emailValidator from '../utils/inputValidators/emailValidator';
import firstNameValidator from '../utils/inputValidators/firstNameValidator';
import lastNameValidator from '../utils/inputValidators/lastNameValidator';
import phoneValidator from '../utils/inputValidators/phoneValidator';
import passwordValidator from '../utils/inputValidators/passwordValidator';
import { passwordCheckValidator } from '../utils/inputValidators/passwordCheckValidator';

export default class SignInModule extends Block{
  constructor(props){
    super({
      ...props,
    });
  }

  init(){
    const navigateBind = navigate.bind(this);
    const loginValidatorBind = loginValidator.bind(this);
    const emailValidatorBind = emailValidator.bind(this);
    const firstNameValidatorBind = firstNameValidator.bind(this);
    const lastNameValidatorBind = lastNameValidator.bind(this);
    const phoneValidatorBind = phoneValidator.bind(this);
    const passwordValidatorBind = passwordValidator.bind(this);
    const passwordCheckValidatorBind = passwordCheckValidator.bind(this);
    const onSignInBind = this.onSignIn.bind(this);

    const EmailInput = new Input({
      label: 'Почта',
      inputId: 'email',
      inputType: 'text',
      inputName: 'email',
      onBlur: emailValidatorBind,
    });

    const LoginInput = new Input({
      label: 'Логин',
      inputId: 'login',
      inputType: 'text',
      inputName: 'login',
      onBlur: loginValidatorBind,
    });

    const FirstNameInput = new Input({
      label: 'Имя',
      inputId: 'first_name',
      inputType: 'text',
      inputName: 'first_name',
      onBlur: firstNameValidatorBind,
    });

    const SecondNameInput = new Input({
      label: 'Фамилия',
      inputId: 'second_name',
      inputType: 'text',
      inputName: 'second_name',
      onBlur: lastNameValidatorBind,
    });

    const PhoneInput = new Input({
      label: 'Телефон',
      inputId: 'phone',
      inputType: 'tel',
      inputName: 'phone',
      onBlur: phoneValidatorBind,
    });

    const PasswordInput = new Input({
      inputId: 'password',
      inputType: 'password',
      inputName: 'password',
      label: 'Пароль',
      onBlur: passwordValidatorBind,
    });

    const PasswordCheckInput = new Input({
      inputId: 'passwordCheck',
      inputType: 'password',
      inputName: 'password',
      label: 'Пароль (ещё раз)',
      onBlur: passwordCheckValidatorBind,
    });

    const RegisterButton = new Button({
      label: 'Зарегистрироваться',
      type: 'primary',
      onClick: onSignInBind,
    });

    const EnterButton = new Button({
      label: 'Войти',
      type: 'link',
      onClick: () => navigateBind('loginPage'),
    });


    this.children = {
      ...this.children,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      PhoneInput,
      PasswordInput,
      PasswordCheckInput,
      RegisterButton,
      EnterButton,

    };
  }

  onSignIn(e){
    e.preventDefault();

    console.log({
      email: this.props.email,
      login: this.props.login,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      phone: this.props.phone,
      password: this.props.password,
    });
  }

  render(): string {
    return(`
        <div class="signin">
        <div class="signin__modal">
            <h1 class="signin__title">Регистрация</h1>
            <form 
            action="{{formAction}}" 
            class="signin__form">
                {{{EmailInput}}}
                {{{LoginInput}}}
                {{{FirstNameInput}}}
                {{{SecondNameInput}}}
                {{{PhoneInput}}}
                {{{PasswordInput}}}
                {{{PasswordCheckInput}}}
                {{{RegisterButton}}}
                {{{EnterButton}}}
            </form>
        </div>
    </div>
        `);

  }
}
