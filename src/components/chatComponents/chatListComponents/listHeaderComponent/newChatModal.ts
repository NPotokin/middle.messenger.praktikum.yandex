import ChatController from '../../../../controllers/chatController.ts';
import Block from '../../../../core/Block.ts';
import { Input, Button, ErrorLine} from '../../../../ui/index.ts';
import newChatValidator from '../../../../utils/inputValidators/newChatValidator.ts';

export default class NewChatModal extends Block{
  constructor(props:{}){
    super({
      ...props,
      events:{
        submit: (e:Event) => this.onSubmit(e),
      },
      ErrorLine: new ErrorLine({
        ...props,
        ErrorText: '',
      }),
    });
  }

  init(){
    const validateChatName = newChatValidator.bind(this);

    const NewChatInput = new Input({
      inputId: 'chatName',
      inputType: 'text',
      inputName: 'chatName',
      label: 'Название чата',
      onBlur: validateChatName,
    });
    const NewChatButton = new Button({
      type: 'primary',
      buttonType: 'submit',
      label: 'Создать новый чат',
    });

    this.children = {
      ...this.children,
      NewChatButton,
      NewChatInput,
    };
  }

  async onSubmit(e:Event) {
    e.preventDefault();
    const inputElement = document.getElementById('chatName') as HTMLInputElement;
    const value = inputElement.value;
    const inputError = this.children.NewChatInput.props.error;
    if(!inputError && value.length !== 0){
      this.children.ErrorLine.setProps({ error: false, ErrorText: null });
      console.log(value);
      const chatData= {title: value};
      await ChatController.createNewChat(chatData);
      await ChatController.getChatsSetChats();
      this.hide()
    } else {
      this.children.ErrorLine.setProps({
        error: true,
        ErrorText: 'Проверьте правильность ввода названия чата',
      });
    }


  }

  render() {
    return(`
            <div class="newChatModal">
                <dialog class="newChatModal__dialog">
                    <p class="newChatModal__title">Придумайте название чата</p>
                    <form class="newChatModal__form">
                        {{{NewChatInput}}}
                        {{{NewChatButton}}}
                        {{{ErrorLine}}}
                    </form>
                </dialog>
            </div>
        `);
  }
}
