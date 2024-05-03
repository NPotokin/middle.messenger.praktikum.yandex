import UserInput from '../../components/userProfileComponents/userInput/userInput.ts';
import Block from '../../core/Block.ts';
import { Button, ErrorLine } from '../../ui/index.ts';
import {passwordValidator, passwordCheckValidator} from '../../utils/inputValidators/index.ts';

interface ProfileCPformInterface{
    ErrorText?: string,
}

export default class ProfileCPform extends Block{
  constructor(props:ProfileCPformInterface){
    super({
      ...props,
      events:{
        submit: (e: Event) => this.onSaveChanges(e),
      },
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),
    });
  }

  init(){
    const passwordValidatorBind = passwordValidator.bind(this);
    const passwordCheckValidatorBind = passwordCheckValidator.bind(this);


    const OldPassInput = new UserInput({
      inputId: 'oldPassword',
      inputName: 'oldPassword',
      label: 'Старый пароль',
      inputType: 'password',
      inputValue: 'ivan',
      userInputContainerClass: 'loginChange',
    });

    const PasswordInput = new UserInput({
      inputId: 'newPassword',
      inputName: 'newPassword',
      label: 'Новый пароль',
      inputType: 'password',
      inputValue: 'ivanivanov',
      onBlur: passwordValidatorBind,
    });

    const PasswordCheckInput = new UserInput({
      inputId: 'newPasswordAgain',
      inputName: 'newPassword',
      label: 'Повторите новый пароль',
      inputType: 'password',
      inputValue: 'ivanivanov',
      onBlur: passwordCheckValidatorBind,
    });

    const SaveButton = new Button({
      type: 'primary--password',
      label:'Сохранить',
      buttonType: 'submit',
    });

    this.children = {
      ...this.children,
      OldPassInput,
      PasswordInput,
      PasswordCheckInput,
      SaveButton,
    };
  }

  onSaveChanges(e: Event){
    e.preventDefault();
    const passwordError = this.children.PasswordInput.props.error;
    const passwordErrorCheck = this.children.PasswordCheckInput.props.error;

    if(!passwordError && !passwordErrorCheck && this.props.password){
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        password: this.props.password,
      });
      window.router.go('/profile')
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(): string {
    return (`
      <form action='' class="profile__form">
        <div class="profile_info">
            {{{OldPassInput}}}
            {{{PasswordInput}}}
            {{{PasswordCheckInput}}}
        </div>
        {{{SaveButton}}}
        {{{ErrorLine}}}
    </form>
      `);
  }
}
