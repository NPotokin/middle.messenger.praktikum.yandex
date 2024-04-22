import Block from '../../../core/Block';
import { Button, Input } from '../../../ui';
import ModalTitle from './modalTitle';
import ModalError from './modalError';
import navigate from '../../../utils/navigate';

export default class ChangeAvatarModal extends Block{
  constructor(props){
    super(props);
  }

  init(){
    const ModalTitleLine = new ModalTitle({
      ModalTitleText: 'Загрузите файл',
    });

    const InputButton = new Button({
      type: 'link--underscore',
      label: 'Выбрать файл на компьютере',
      onClick: () => this.triggerFileInput(),
    });

    const FileInput = new Input({
      inputType: 'file',
      inputClass: '__hidden',
      onChange: (event) => this.handleFileInputChange(event),
    });

    const SubmitButton = new Button({
      type: 'primary',
      label: 'Поменять',
      onClick: () => this.handleSubmitButtonClick(),
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
      const fileInputElement = fileInputComponent.getContent().querySelector('input[type="file"]');
      if (fileInputElement) {
        fileInputElement.click();
      }
    }
  }

  handleFileInputChange(event) {
    const fileName = event.target.files[0].name;
    const inputButtonComponent = this.children.InputButton;
    const modalErrorComponent = this.children.ModalErrorLine;
    if (modalErrorComponent) {
      const modalErrorElement = modalErrorComponent.getContent();
      modalErrorElement.style.display = 'none'; // Hide the error line
    }
    if (inputButtonComponent) {
      inputButtonComponent.setProps({
        label: fileName,
        type: 'link--gray',
      });
    }
  }


  handleSubmitButtonClick() {
    const fileInputComponent = this.children.FileInput;
    const modalErrorComponent = this.children.ModalErrorLine;
    if (fileInputComponent && modalErrorComponent) {
      const fileInputElement = fileInputComponent
        .getContent()
        .querySelector('input[type="file"]');
      if (!fileInputElement || !fileInputElement.files[0]) {
        const modalErrorElement = modalErrorComponent.getContent();
        modalErrorElement.style.display = 'block';
      } else {
        const modalErrorElement = modalErrorComponent.getContent();
        modalErrorElement.style.display = 'none';
        navigate('profilePage');
      }
    }
  }


  render(){
    return(`
            <dialog class="modal">
                {{{ModalTitleLine}}}
                {{{FileInput}}}
                {{{InputButton}}}
                {{{SubmitButton}}}
                {{{ModalErrorLine}}}
            </dialog>
        `);
  }
}