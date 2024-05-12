import Block from '../../../../../core/Block.ts';
import DialoAddUserForm from './dialogAddUserForm.ts';

export default class DialogAddUser extends Block{
  constructor(props:{}){
    super({
      ...props,
      DialogAddUserForm: new DialoAddUserForm({...props}),
    });
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        {{{DialogAddUserForm}}}
        </dialog>
        `);
  }
}

