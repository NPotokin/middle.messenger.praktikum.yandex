import Block from '../../core/Block';
import { ArrowButton, Image, Button } from '../../ui';
import navigate from '../utils/navigate';
import { ErrorLine } from '../../ui';
import { UserInput } from '../../components/userProfileComponents/userInput';
import { ChangeAvatarModal } from '../../components/userProfileComponents/modals';
import emailValidator from '../utils/inputValidators/emailValidator';
import loginValidator from '../utils/inputValidators/loginValidator';
import firstNameValidator from '../utils/inputValidators/firstNameValidator';
import lastNameValidator from '../utils/inputValidators/lastNameValidator';
import phoneValidator from '../utils/inputValidators/phoneValidator';

export default class ProfileMainModule extends Block{
  constructor(props){
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
        contSize:'__128',
        imgSrc:'/icons/image.svg',
        onClick: () => this.toggleChangeAvatarModalVisibility(),
      }),
      ChangeAvatarModal: new ChangeAvatarModal({
        ...props,
      }),
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),

    });
  }

  init(){
    const onSaveChangesBind = this.onSaveChanges.bind(this);
    const emailValidatorBind = emailValidator.bind(this);
    const loginValidatorBind = loginValidator.bind(this);
    const firstNameValidatorBind = firstNameValidator.bind(this);
    const lastNameValidatorBind = lastNameValidator.bind(this);
    const phoneValidatorBind = phoneValidator.bind(this);


    const EmailInput = new UserInput({
      inputId:'email',
      inputName:'email',
      label:'Почта',
      inputType:'email',
      inputValue:'pochta@yandex.ru',
      userInputContainerClass:'loginChange',
      onBlur: emailValidatorBind,
    });

    const LoginInput = new UserInput({
      inputId: 'login',
      inputName: 'login',
      label: 'Логин',
      inputType: 'text',
      inputValue: 'ivanivanov',
      onBlur: loginValidatorBind,
    });

    const FirstNameInput = new UserInput({
      inputId: 'first_name' ,
      inputName: 'first_name',
      label: 'Имя',
      inputType: 'text',
      inputValue: 'Иван',
      onBlur: firstNameValidatorBind,
    });

    const SecondNameInput = new UserInput({
      inputId:'second_name' ,
      inputName:'second_name',
      label:'Фамилия',
      inputType:'text',
      inputValue:'Иванов',
      onBlur: lastNameValidatorBind,

    });

    const DisplayNameInput = new UserInput({
      inputId:'display_name' ,
      inputName:'display_name',
      label:'Имя в чате',
      inputType:'text',
      inputValue:'Иван',
    });

    const PhoneInput = new UserInput({
      inputId:'phone' ,
      inputName:'phone',
      label:'Телефон',
      inputType:'tel',
      inputValue:'7 (909) 967 30 30',
      onBlur: phoneValidatorBind,

    });

    const SaveButton = new Button({
      type: 'primary--password',
      label:'Сохранить',
      onClick: onSaveChangesBind,
    });

    this.children = {
      ...this.children,
      EmailInput,
      LoginInput,
      FirstNameInput,
      SecondNameInput,
      DisplayNameInput,
      PhoneInput,
      SaveButton,
    };
  }

  onSaveChanges(e){
    e.preventDefault();
    const emailError = this.children.EmailInput.props.error;
    const inputError = this.children.LoginInput.props.error;
    const firstNameError = this.children.FirstNameInput.props.error;
    const secondtNameError = this.children.SecondNameInput.props.error;
    const phoneError = this.children.PhoneInput.props.error;

    if(!emailError &&
            !inputError &&
            !firstNameError &&
            !secondtNameError &&
            !phoneError) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        email: this.props.email,
        login: this.props.login,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone,
        password: this.props.password,
      });
      navigate('profilePage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }


  toggleChangeAvatarModalVisibility() {
    const modalComponent = this.children.ChangeAvatarModal;
    if (modalComponent) {
      const modalElement = modalComponent.getContent();
      if (modalElement) {
        const currentDisplay = modalElement.style.display;
        modalElement.style.display = currentDisplay === 'none' ? 'flex' : 'none';
      }
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
                        <div class="profile_info">
                        {{{EmailInput}}}
                        {{{LoginInput}}}
                        {{{FirstNameInput}}}
                        {{{SecondNameInput}}}
                        {{{DisplayNameInput}}}
                        {{{PhoneInput}}}
                        <div class='profile__modal'>
                            {{{ChangeAvatarModal}}}
                        </div>
                    </div>
                        {{{SaveButton}}}
                        {{{ErrorLine}}}
                    </div>
                </div>
            </div>
        `);
  }
}