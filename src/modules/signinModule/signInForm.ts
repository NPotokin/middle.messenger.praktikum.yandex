import Block from '../../core/Block.ts';
import { Button, ErrorLine, Input } from '../../ui/index.ts';
import * as validators from '../../utils/inputValidators/index.ts';
import SignupController from '../../controllers/signupController.ts';

interface SignInFormInterface{
    onBlur?: (e:Event) => void;
    onSubmit?: (e:Event) => void;
    ErrorText?: string,
    formAction?: string,
}

export default class SignInForm extends Block{
  constructor(props: SignInFormInterface){
    super({
      ...props,
      formAction: 'POST',
      events:{
        submit: (e: Event) => this.onSignIn(e),
      },
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),
    });
  }

  init(){
    const loginValidatorBind = validators.loginValidator.bind(this);
    const emailValidatorBind = validators.emailValidator.bind(this);
    const firstNameValidatorBind = validators.firstNameValidator.bind(this);
    const lastNameValidatorBind = validators.lastNameValidator.bind(this);
    const phoneValidatorBind = validators.phoneValidator.bind(this);
    const passwordValidatorBind = validators.passwordValidator.bind(this);
    const passwordCheckValidatorBind = validators.passwordCheckValidator.bind(this);

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
      buttonType: 'submit',
    });

    const EnterButton = new Button({
      label: 'Войти',
      type: 'link',
      onClick: () => window.router.go('/login'),
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

  onSignIn(e: Event){
    e.preventDefault();
    const emailError = this.children.EmailInput.props.error;
    const inputError = this.children.LoginInput.props.error;
    const firstNameError = this.children.FirstNameInput.props.error;
    const secondtNameError = this.children.SecondNameInput.props.error;
    const phoneError = this.children.PhoneInput.props.error;
    const passwordError = this.children.PasswordInput.props.error;
    const passwordCheckError = this.children.PasswordCheckInput.props.error;

    if(!emailError && this.props.email &&
           !inputError && this.props.login &&
           !firstNameError && this.props.firstName &&
           !secondtNameError && this.props.lastName &&
           !phoneError && this.props.lastName &&
           !passwordError && this.props.password &&
           !passwordCheckError) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });

      const userData: Record<string, unknown> = {
        first_name: this.props.firstName,
        second_name: this.props.lastName,
        login: this.props.login,
        email: this.props.email,
        password: this.props.password,
        phone: this.props.phone,
      };

      console.log(userData);

      SignupController.createNewUser(userData);

      // navigate('chatPage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(): string {
    return(`
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
            `);

  }
}
