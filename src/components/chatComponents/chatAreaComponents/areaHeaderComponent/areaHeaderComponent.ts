import Block from '../../../../core/Block.ts';
import { Image } from '../../../../ui/index.ts';
import AddDeleteMain from './modal/addDeleteUser.ts';
import AddDeleteDiv from './modal/addDeleteDiv.ts';
import { DialogAddUser, DialogDeleteUser } from './modal/index.ts';
import connect from '../../../../utils/connect.ts';
import store, { ChatData } from '../../../../core/Store.ts';

class AreaHeaderComponent extends Block {
  constructor(props:{}) {
    super({
      ...props,
      chatName: '',
      Img: new Image({
        ...props,
        contSize: '__38',
      }),
      AddDeleteMain: new AddDeleteMain({
        ...props,
        onAddClick: () => this.toggleDialogVisibility('DialogAddUser'),
        onDeleteClick: () => this.toggleDialogVisibility('DialogDeleteUser'),
      }),
      AddDeleteDiv: new AddDeleteDiv({
        ...props,
        onClick: () => this.toggleAddDeleteMainVisibility(),
      }),
      DialogAddUser: new DialogAddUser({
        ...props,
        label: 'Добавить',
        ADUtitleText: 'Добавить пользователя',
      }),
      DialogDeleteUser: new DialogDeleteUser({
        ...props,
        label: 'Удалить',
        ADUtitleText: 'Удалить пользователя',
      }),
    });
  }

  toggleDialogVisibility(dialogName:string) {
    const dialog = this.children[dialogName];
    const dialogElement = dialog.getContent();


    if (dialogElement.style.display !== 'none') {
      dialogElement.style.display = 'none';
      return;
    }

    const otherDialogName = dialogName === 'DialogAddUser' ? 'DialogDeleteUser' : 'DialogAddUser';
    const otherDialog = this.children[otherDialogName];
    const otherDialogElement = otherDialog.getContent();
    if (otherDialogElement.style.display !== 'none') {
      otherDialogElement.style.display = 'none';
    }


    dialogElement.style.display = 'flex';
  }


  toggleAddDeleteMainVisibility() {
    const modalElement = this.children.AddDeleteMain.getContent();
    if (modalElement.style.display === 'none' || modalElement.style.display === '') {
      modalElement.style.display = 'flex';
    } else {
      modalElement.style.display = 'none';
    }
  }

  render() {
    const activeChat =store.getState().chats?.find(chat => chat.isActive)?.title
     || store.getState().chats?.find(chat => chat.id === store.getState().activeChat?.id)?.title;
    return (`
            <div class="chatAreaHeader">
            {{{DialogAddUser}}}
            {{{DialogDeleteUser}}}
                <div class="chatAreaHeader__image">
                    {{{Img}}}
                </div>
                <div class="chatAreaHeader__title">
                    ${activeChat}
                </div>
                <div>{{{AddDeleteMain}}}</div>
                {{{AddDeleteDiv}}}
            </div>
        `);
  }
}

function mapStateToProps(store: { chats: ChatData[]}) {
  return{
    chats: store.chats,
  };
}

export default connect(mapStateToProps)(AreaHeaderComponent);
