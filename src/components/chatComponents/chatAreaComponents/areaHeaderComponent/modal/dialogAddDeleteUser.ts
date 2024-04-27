import Block from '../../../../../core/Block.ts';
import DialoAddDeleteUserForm from './dialogAddDeleteUserForm.ts';

export default class DialogAddDeleteUser extends Block{
  constructor(props:{}){
    super({
      ...props,
      DialogAddDeleteUserForm: new DialoAddDeleteUserForm({...props})
    });
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        {{{DialogAddDeleteUserForm}}}
        </dialog>
        `);
  }
}

