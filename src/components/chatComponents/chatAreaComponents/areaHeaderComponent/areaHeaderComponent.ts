import Block from '../../../../core/Block.ts';
import { Image } from '../../../../ui/index.ts';
import AddDeleteMain from './modal/addDeleteUser.ts';
import AddDeleteDiv from './modal/addDeleteDiv.ts';
import { DialogAddDeleteUser } from './modal/index.ts';

export default class AreaHeaderComponent extends Block {
  constructor(props:{}) {
    super({
      ...props,
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
      DialogAddUser: new DialogAddDeleteUser({
        ...props,
        label: 'Добавить',
        ADUtitleText: 'Добавить пользователя',
      }),
      DialogDeleteUser: new DialogAddDeleteUser({
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
      modalElement.style.display = 'flex'; // Show the modal
    } else {
      modalElement.style.display = 'none'; // Hide the modal
    }
  }

  render() {
    return (`
            <div class="chatAreaHeader">
            {{{DialogAddUser}}}
            {{{DialogDeleteUser}}}
                <div class="chatAreaHeader__image">
                    {{{Img}}}
                </div>
                <div class="chatAreaHeader__title">
                    Вадим
                </div>
                <div>{{{AddDeleteMain}}}</div>
                {{{AddDeleteDiv}}}
            </div>
        `);
  }
}
