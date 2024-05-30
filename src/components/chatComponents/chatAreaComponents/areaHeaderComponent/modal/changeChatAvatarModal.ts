import Block from '../../../../../core/Block.ts';
import { Button, Input } from '../../../../../ui/index.ts';
import ModalTitle from '../../../../userProfileComponents/modals/modalTitle.ts';
import ModalError from '../../../../userProfileComponents/modals/modalError.ts';
import ChatController from '../../../../../controllers/chatController.ts';
import store from '../../../../../core/Store.ts';

interface CAMinterface{}
interface FileInputChangeEvent extends Event {
  target: HTMLInputElement & EventTarget;
}
export default class ChangeAvatarModal extends Block{
  constructor(props: CAMinterface){
    super(props);
  }

  init(){
    const ModalTitleLine = new ModalTitle({
      ModalTitleText: 'Загрузите Аватар',
    });

    const InputButton = new Button({
      type: 'link--underscore',
      label: 'Выбрать файл на компьютере',
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.triggerFileInput();
      },
    });

    const FileInput = new Input({
      inputType: 'file',
      inputClass: '__hidden',
      onChange: (event: FileInputChangeEvent) => this.handleFileInputChange(event),
    });

    const SubmitButton = new Button({
      type: 'primary',
      label: 'Загрузить',
      onClick: (event) => {
        event.preventDefault();
        this.handleSubmitButtonClick();},
    });

    const ModalErrorLine = new ModalError({

    });

    this.children = {
      ...this.children,
      ModalTitleLine,
      InputButton,
      FileInput,
      SubmitButton,
      ModalErrorLine,
    };

  }

  triggerFileInput() {
    const fileInputComponent = this.children.FileInput;
    if (fileInputComponent) {
      const fileInputElement = fileInputComponent.getContent().querySelector('input[type="file"]')  as HTMLInputElement;
      if (fileInputElement) {
        fileInputElement.click();
      }
    }
  }

  handleFileInputChange(event: FileInputChangeEvent) {
    if (!event.target.files || event.target.files.length === 0) {
      console.log('No files selected.');
      return;
    }
    const fileName = event.target.files[0].name;
    const inputButtonComponent = this.children.InputButton;
    const modalErrorComponent = this.children.ModalErrorLine;
    if (modalErrorComponent) {
      const modalErrorElement = modalErrorComponent.getContent();
      modalErrorElement.style.display = 'none';
    }
    if (inputButtonComponent) {
      inputButtonComponent.setProps({
        label: fileName,
        type: 'link--gray',
      });
    }
  }


  async handleSubmitButtonClick() {
    const fileInputComponent = this.children.FileInput;
    const modalErrorComponent = this.children.ModalErrorLine;
    if (fileInputComponent && modalErrorComponent) {
      const fileInputElement = fileInputComponent
        .getContent()
        .querySelector('input[type="file"]') as HTMLInputElement;
      if (!fileInputElement || !fileInputElement.files || fileInputElement.files.length === 0) {
        const modalErrorElement = modalErrorComponent.getContent();
        modalErrorElement.style.display = 'block';
      } else {
        const modalErrorElement = modalErrorComponent.getContent();
        modalErrorElement.style.display = 'none';

        const imageData = new FormData();
        const id = store.getState().activeChat!.id!.toString();
        imageData.append('avatar', fileInputElement.files[0]);
        imageData.append('chatId', id);
        await ChatController.changeChatAvatar(imageData);
        await ChatController.getChatsSetChats();
        this.hide();
      }
    }
  }


  render(): string {
    return(`
            <dialog class="ADUcontainer">
            <div class="ADUmodal"> 
              <form action='' class='modal__form' id="form">
                {{{ModalTitleLine}}}
                {{{FileInput}}}
                {{{InputButton}}}
                {{{SubmitButton}}}
                {{{ModalErrorLine}}}
              </form>
            </div>
            </dialog>
        `);
  }
}
