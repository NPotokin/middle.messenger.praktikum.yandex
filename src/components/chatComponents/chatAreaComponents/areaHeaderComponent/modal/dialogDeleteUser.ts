import Block from '../../../../../core/Block.ts';
import DialogDeleteUserForm from './dialogDeleteUserForm.ts';

export default class DialogDeleteUser extends Block{
  constructor(props:{}){
    super({
      ...props,
      DialogDeleteUserForm: new DialogDeleteUserForm({...props}),
    });
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        {{{DialogDeleteUserForm}}}
        </dialog>
        `);
  }
}

