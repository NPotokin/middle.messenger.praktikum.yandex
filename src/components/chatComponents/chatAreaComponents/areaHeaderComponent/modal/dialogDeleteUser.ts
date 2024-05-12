import ChatController from '../../../../../controllers/chatController.ts';
import Block from '../../../../../core/Block.ts';
import DialogDeleteUserForm from './dialogDeleteUserForm.ts';

export default class DialogDeleteUser extends Block{
  constructor(props:{}){
    super({
      ...props,
      DialogDeleteUserForm: new DialogDeleteUserForm({
        ...props,
        onSubmit: (e:Event)=> this.onLogin(e)
      }),
    });
  }

  async onLogin(e: Event) {
    e.preventDefault();
    const inputError = this.children.DialogDeleteUserForm.children.LoginInput.props.error;


    if (!inputError  && this.children.DialogDeleteUserForm.props.login ) {
      this.children.DialogDeleteUserForm.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        login: this.children.DialogDeleteUserForm.props.login,
      });

      const login = this.children.DialogDeleteUserForm.props.login
      await ChatController.deleteUser({login})
      await ChatController.getChatsSetChats()
      this.hide()

    } else {
      this.children.DialogDeleteUserForm.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        {{{DialogDeleteUserForm}}}
        </dialog>
        `);
  }
}

