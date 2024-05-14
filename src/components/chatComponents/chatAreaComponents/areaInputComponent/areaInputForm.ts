import Block from '../../../../core/Block.ts';
import ChatInput from './chatInput.ts';
import { ArrowButton, ErrorLine} from '../../../../ui/index.ts';
import store from '../../../../core/Store.ts';
import wsService from '../../../../core/WebSocket.ts';

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
        inputName: 'SendMessage'
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
    const inputElement = document.getElementsByName('SendMessage')[0] as HTMLInputElement
    const message = inputElement.value
    if(message.length === 0){
      this.children.ErrorLine.setProps({error: true, ErrorText: 'Сообщение не может быть пустым'})
    } 
    // here add ws.send and ws.getOld
    // const chatID = store.getState().chats?.find(chat => chat.isActive)!.id as number;
    // const token = store.getState().token as string;
    // wsService.openConnection(chatID, token);
    wsService.sendMessage(message, 'message')
    wsService.getOldMessages();
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


