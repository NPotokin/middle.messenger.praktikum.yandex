import ChatController from '../../../../../controllers/chatController.ts';
import Block from '../../../../../core/Block.ts';
import DialogAddUserForm from './dialogAddUserForm.ts';

export default class DialogAddUser extends Block{
  constructor(props:{}){
    super({
      ...props,
      DialogAddUserForm: new DialogAddUserForm({
        ...props,
        onSubmit: (e:Event)=> this.onLogin(e),
      }),
    });
  }

  async onLogin(e: Event) {
    e.preventDefault();
    const inputError = this.children.DialogAddUserForm.children.LoginInput.props.error;


    if (!inputError  && this.children.DialogAddUserForm.props.login ) {
      this.children.DialogAddUserForm.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log({
        login: this.children.DialogAddUserForm.props.login,
      });

      const login = this.children.DialogAddUserForm.props.login;
      await ChatController.addUser({login});
      await ChatController.getChatsSetChats();
      this.hide();

    } else {
      this.children.DialogAddUserForm.children.ErrorLine.setProps({ error: true, ErrorText: 'Проверьте правильность ввода данных' });
    }
  }

  render(){
    return(`
        <dialog class="ADUcontainer">
        {{{DialogAddUserForm}}}
        </dialog>
        `);
  }
}

