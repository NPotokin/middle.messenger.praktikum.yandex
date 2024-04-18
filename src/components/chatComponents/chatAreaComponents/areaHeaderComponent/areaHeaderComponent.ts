import Block from "../../../../core/Block";
import { Image } from "../../../../ui";
import AddDeleteMain from "./modal/addDeleteUser";
import AddDeleteDiv from "./modal/addDeleteDiv";
import { DialogAddDeleteUser } from "./modal";

export default class AreaHeaderComponent extends Block {
    constructor(props) {
        super({
            ...props,
            Img: new Image({
                ...props,
                contSize: '__38'
            }),
            AddDeleteMain: new AddDeleteMain({
                ...props,
                onAddClick: () => this.toggleDialogVisibility('DialogAddUser'),
                onDeleteClick: () => this.toggleDialogVisibility('DialogDeleteUser')
            }),
            AddDeleteDiv: new AddDeleteDiv({
                ...props,
                onClick: () => this.toggleAddDeleteMainVisibility() 
            }),
            DialogAddUser: new DialogAddDeleteUser({
                ...props,
                label: 'Добавить',
                ADUtitleText: 'Добавить пользователя'
            }),
            DialogDeleteUser: new DialogAddDeleteUser({
                ...props,
                label: 'Удалить',
                ADUtitleText: 'Удалить пользователя'
            }),
        });
    }

    toggleDialogVisibility(dialogName) {
        const dialog = this.children[dialogName];
        const dialogElement = dialog.getContent();
    
        // Hide the dialog if it's already visible
        if (dialogElement.style.display !== 'none') {
            dialogElement.style.display = 'none';
            return;
        }
    
        // Hide the other dialog if it's visible
        const otherDialogName = dialogName === 'DialogAddUser' ? 'DialogDeleteUser' : 'DialogAddUser';
        const otherDialog = this.children[otherDialogName];
        const otherDialogElement = otherDialog.getContent();
        if (otherDialogElement.style.display !== 'none') {
            otherDialogElement.style.display = 'none';
        }
    
        // Show the clicked dialog
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
