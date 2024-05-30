import Block from '../../../../core/Block.ts';
import { Image } from '../../../../ui/index.ts';
import AddDeleteMain from './modal/addDeleteUser.ts';
import AddDeleteDiv from './modal/addDeleteDiv.ts';
import { DialogAddUser, DialogDeleteUser } from './modal/index.ts';
import connect from '../../../../utils/connect.ts';
import store, { ChatData } from '../../../../core/Store.ts';
import ChangeAvatarModal from './modal/changeChatAvatarModal.ts';

class AreaHeaderComponent extends Block {
  constructor(props:{}) {
    const activeChat = store.getState().chats?.find(chat => chat.isActive);
    const initialImgSrc = activeChat?.avatar
      ? `https://ya-praktikum.tech/api/v2/resources${activeChat.avatar}`
      : '/icons/image.svg';
    super({
      ...props,
      chatName: '',
      Img: new Image({
        ...props,
        contSize: '__38',
        imgSize: '36px',
        imgSrc: initialImgSrc,
      }),
      AddDeleteMain: new AddDeleteMain({
        ...props,
        onAddClick: () => this.toggleDialogVisibility('DialogAddUser'),
        onDeleteClick: () => this.toggleDialogVisibility('DialogDeleteUser'),
        onAddAvatarClick: () => this.toggleDialogVisibility('DialogNewAvatar'),
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
      DialogNewAvatar: new ChangeAvatarModal({
        ...props,
      }),
    });
  }

  toggleDialogVisibility(dialogName: string) {
    const dialog = this.children[dialogName];
    const dialogElement = dialog.getContent();

    if (dialogElement.style.display !== 'none') {
      dialogElement.style.display = 'none';
      return;
    }

    const dialogNames = ['DialogAddUser', 'DialogDeleteUser', 'DialogNewAvatar'];

    dialogNames.forEach(name => {
      if (name !== dialogName) {
        const otherDialog = this.children[name];
        const otherDialogElement = otherDialog.getContent();
        if (otherDialogElement.style.display !== 'none') {
          otherDialogElement.style.display = 'none';
        }
      }
    });

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

  componentDidUpdate(oldProps?:{chats: ChatData[]}, newProps?: {chats: ChatData[]}): boolean {
    if (oldProps !== newProps){
      console.log('123 - cdu');
      const activeChat = newProps?.chats.find(chat => chat.isActive);
      const imgSrc = activeChat?.avatar
        ? `https://ya-praktikum.tech/api/v2/resources${activeChat.avatar}`
        : '/icons/image.svg';

      this.children.Img.setProps({
        imgSrc: imgSrc,
      });
    }
    return true;

  }

  render() {
    const activeChat = store.getState().chats?.find(chat => chat.isActive)?.title
     || store.getState().chats?.find(chat => chat.id === store.getState().activeChat?.id)?.title;
    return (`
            <div class="chatAreaHeader">
            {{{DialogAddUser}}}
            {{{DialogDeleteUser}}}
            {{{DialogNewAvatar}}}
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
