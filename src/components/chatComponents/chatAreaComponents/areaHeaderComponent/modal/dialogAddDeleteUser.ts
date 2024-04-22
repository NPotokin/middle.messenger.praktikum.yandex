import Block from '../../../../../core/Block';
import { Button, Input } from '../../../../../ui';


export default class DialogAddDeleteUser extends Block{
  constructor(props){
    super({
      ...props,
      Input: new Input({
        ...props,
        inputId: 'login',
        inputType: 'text',
        inputName: 'login',
        label: 'Логин',
      }),
      Button: new Button({
        ...props,
        type: 'primary',
      }),
    });
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        <form class="ADUmodal">
            <h2 class="modal__title">{{ADUtitleText}}</h2>
            {{{Input}}}
            {{{Button}}}
        </form>
        </dialog>
        `);
  }
}

