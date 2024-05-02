import Block from '../../../../../core/Block.ts';
import { Button, Input, ErrorLine } from '../../../../../ui/index.ts';
import loginValidator from '../../../../../utils/inputValidators/loginValidator.ts';
// import navigate from '../../../../../utils/navigate.ts';

interface DialoAddDeleteUserFormInterface{

}

export default class DialoAddDeleteUserForm extends Block{
  constructor(props: DialoAddDeleteUserFormInterface){
    super({
      ...props,
      events:{
        submit: (e: Event) => this.onLogin(e),
      },
      Button: new Button({
        ...props,
        type: 'primary',
        buttonType: 'submit',
      }),
      ErrorLine: new ErrorLine({
        ...props,
      }),
    });
  }

  init(){
    const LoginInputBind = loginValidator.bind(this);

    const LoginInput = new Input({
      inputId: 'login',
      inputType: 'text',
      inputName: 'login',
      label: 'Логин',
      onBlur: LoginInputBind,
    });

    this.children = {
      ...this.children,
      LoginInput,
    };
  }

  onLogin(e: Event) {
    e.preventDefault();
    const inputError = this.children.LoginInput.props.error;


    if (!inputError  && this.props.login ) {
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        login: this.props.login,
      });
      // navigate('chatPage');
    } else {
      this.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }


  render(): string {
    return( `
        <form class="ADUmodal">
            <h2 class="modal__title">{{ADUtitleText}}</h2>
                {{{LoginInput}}}
                {{{Button}}}
                {{{ErrorLine}}}
        </form>
        `);
  }
}