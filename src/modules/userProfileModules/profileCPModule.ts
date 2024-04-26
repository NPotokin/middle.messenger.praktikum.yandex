import Block from '../../core/Block.ts';
import { ArrowButton, Image, Button } from '../../ui/index.ts';
import navigate from '../../utils/navigate.ts';
import { UserInput } from '../../components/userProfileComponents/userInput/index.ts';
import { ErrorLine } from '../../ui/index.ts';
import passwordValidator from '../../utils/inputValidators/passwordValidator.ts';
import passwordCheckValidator  from '../../utils/inputValidators/passwordCheckValidator.ts';

interface ProfileMainModuleInterface{
  ErrorText?: string,
}
export default class ProfileMainModule extends Block{
  constructor(props: ProfileMainModuleInterface){
    super({
      ...props,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => navigate('profilePage'),
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'40px',
        contSize:'__128still',
        imgSrc:'/icons/image.svg',
      }),
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),

    });
  }

  init(){
    const onSaveChangesBind = this.onSaveChanges.bind(this);
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
      onClick: onSaveChangesBind,
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

    if(!passwordError && !passwordErrorCheck){
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        password: this.props.password,
      });
      navigate('profilePage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(){
    return(`
            <div class="profile">
                <div class="profile__buttonArea">
                    {{{BackButton}}}
                </div>
                <div class="profile__main">
                    <div class="profileContainer">
                        {{{AvatarImage}}}
                        <form action='' class="profile__form">
                          <div class="profile_info">
                            {{{OldPassInput}}}
                            {{{PasswordInput}}}
                            {{{PasswordCheckInput}}}
                          </div>
                          {{{SaveButton}}}
                        </form>
                          {{{ErrorLine}}}
                    </div>
                </div>
            </div>
        `);
  }
}
