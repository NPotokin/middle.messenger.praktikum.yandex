import Block from '../../../../core/Block.ts';
import ChatInput from './chatInput.ts';
import { ArrowButton, ErrorLine} from '../../../../ui/index.ts';
import wsService from '../../../../core/WebSocket.ts';
import ChatController from '../../../../controllers/chatController.ts';

interface AreaInputFormInteface{
    message?: string,
    ErrorText?: string,
    onBlur?: ()=>void,
}

export default class AreaInputForm extends Block{
  constructor(props: AreaInputFormInteface){
    super({
      ...props,
      events:{
        submit: (e:Event) => this.onMessage(e),
      },
      ArrowButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-right.svg',
        buttonType: 'submit',
      }),
      ChatInputField: new ChatInput({
        placeHolder: 'Сообщение',
        inputName: 'SendMessage',
      }),
      ErrorLine: new ErrorLine({
        ...props,
        error: props.ErrorText,
      }),
    });
  }

  componentDidUpdate(oldProps: {}, newProps: {}): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.ErrorLine.setProps(newProps);
    return true;
  }

  async onMessage(e:Event){
    e.preventDefault();
    const inputElement = document.getElementsByName('SendMessage')[0] as HTMLInputElement;
    const message = inputElement.value;
    if(message.length === 0){
      this.children.ErrorLine.setProps({error: true, ErrorText: 'Сообщение не может быть пустым'});
    }
    wsService.sendMessage(message, 'message');
    wsService.getOldMessages();
    inputElement.value = ''
  }


  render(): string {
    return(`
        <form class="chatAreaInput__input">
            <div class="chatAreaInput__inputWithError">
                {{{ChatInputField}}}
                {{{ErrorLine}}}
            </div>
            <div class="chatAreaInput__send">
                {{{ArrowButton}}}
            </div>
        </form>
        `);
  }
}


