import UserInput from '../../components/userProfileComponents/userInput/userInput.ts';
import UserController from '../../controllers/userController.ts';
import Block from '../../core/Block.ts';
import { Button, ErrorLine } from '../../ui/index.ts';
import {oldPasswordValidator, newPasswordValidator, passwordCheckValidatorProfile} from '../../utils/inputValidators/index.ts';

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
    const oldPasswordValidatorBind = oldPasswordValidator.bind(this);
    const newPasswordValidatorBind = newPasswordValidator.bind(this);
    const passwordCheckValidatorBind = passwordCheckValidatorProfile.bind(this);


    const OldPassInput = new UserInput({
      inputId: 'oldPassword',
      inputName: 'oldPassword',
      label: 'Старый пароль',
      inputType: 'password',
      inputValue: 'ivan',
      onBlur: oldPasswordValidatorBind,
      userInputContainerClass: 'loginChange',
    });

    const PasswordInput = new UserInput({
      inputId: 'newPassword',
      inputName: 'newPassword',
      label: 'Новый пароль',
      inputType: 'password',
      inputValue: 'ivanivanov',
      onBlur: newPasswordValidatorBind,
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

    if(!passwordError && !passwordErrorCheck && this.props.newPassword){
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });

      const userPasswordsData = {
        oldPassword: this.props.oldPassword,
        newPassword: this.props.newPassword,
      }
      console.log(userPasswordsData)
      UserController.changePassword(userPasswordsData)
      
      window.router.go('/settings')
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
