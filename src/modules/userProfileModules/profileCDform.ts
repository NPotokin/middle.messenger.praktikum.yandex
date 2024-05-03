import ChangeAvatarModal from '../../components/userProfileComponents/modals/changeAvatarModal.ts';
import {UserInput} from '../../components/userProfileComponents/userInput/index.ts';
import Block from '../../core/Block.ts';
import { Image, ErrorLine, Button } from '../../ui/index.ts';
import * as validate from '../../utils/inputValidators/index.ts';

interface ProfileCDformInterface{
    ErrorText?: string,
  }

export default class ProfileCDform extends Block{
  constructor(props:ProfileCDformInterface){
    super({
      ...props,
      events: {
        submit: (e:Event) => this.onSaveChanges(e),
      },
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
    const emailValidatorBind = validate.emailValidator.bind(this);
    const loginValidatorBind = validate.loginValidator.bind(this);
    const firstNameValidatorBind = validate.firstNameValidator.bind(this);
    const lastNameValidatorBind = validate.lastNameValidator.bind(this);
    const phoneValidatorBind = validate.phoneValidator.bind(this);


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
      buttonType: 'submit',
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

  onSaveChanges(e: Event){
    e.preventDefault();
    const emailError = this.children.EmailInput.props.error;
    const inputError = this.children.LoginInput.props.error;
    const firstNameError = this.children.FirstNameInput.props.error;
    const secondtNameError = this.children.SecondNameInput.props.error;
    const phoneError = this.children.PhoneInput.props.error;

    if(!emailError && this.props.email &&
            !inputError && this.props.login &&
            !firstNameError && this.props.firstName &&
            !secondtNameError && this.props.lastName &&
            !phoneError && this.props.phone ) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        email: this.props.email,
        login: this.props.login,
        firstName: this.props.firstName,
        lastName: this.props.lastName,
        phone: this.props.phone,
      });
      window.router.go('/profile')
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

  render(): string {
    return(`
        <form action='' class="profile__main">
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
        </form>
        `);
  }
}

