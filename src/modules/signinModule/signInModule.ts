import Block from '../../core/Block';
import { Button } from '../../ui';
import {Input} from '../../ui';
import { ErrorLine } from '../../ui';
import navigate from '../../utils/navigate';
import loginValidator from '../../utils/inputValidators/loginValidator';
import emailValidator from '../../utils/inputValidators/emailValidator';
import firstNameValidator from '../../utils/inputValidators/firstNameValidator';
import lastNameValidator from '../../utils/inputValidators/lastNameValidator';
import phoneValidator from '../../utils/inputValidators/phoneValidator';
import passwordValidator from '../../utils/inputValidators/passwordValidator';
import { passwordCheckValidator } from '../../utils/inputValidators/passwordCheckValidator';

export default class SignInModule extends Block{
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
    const emailError = this.children.EmailInput.props.error;
    const inputError = this.children.LoginInput.props.error;
    const firstNameError = this.children.FirstNameInput.props.error;
    const secondtNameError = this.children.SecondNameInput.props.error;
    const phoneError = this.children.PhoneInput.props.error;
    const passwordError = this.children.PasswordInput.props.error;
    const passwordCheckError = this.children.PasswordCheckInput.props.error;

    if(!emailError &&
       !inputError &&
       !firstNameError &&
       !secondtNameError &&
       !phoneError &&
       !passwordError &&
       !passwordCheckError) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        email: this.props.email,
        login: this.props.login,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone,
        password: this.props.password,
      });
      navigate('chatPage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }


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
                {{{ErrorLine}}}
                {{{EnterButton}}}
            </form>
        </div>
    </div>
        `);

  }
}
