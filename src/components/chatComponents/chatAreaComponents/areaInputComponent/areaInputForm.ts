import Block from "../../../../core/Block.ts";
import ChatInput from './chatInput.ts';
import { ArrowButton} from '../../../../ui/index.ts';
import chatInputValidator from "../../../../utils/inputValidators/chatInputValidator.ts";

interface AreaInputFormInteface{
    message?: string,
}

export default class AreaInputForm extends Block{
    constructor(props: AreaInputFormInteface){
        super({
            ...props,
            events:{
                submit: (e:Event) => this.onMessage(e)
            },
            ArrowButton: new ArrowButton({
                ...props,
                src: '/icons/arrow-right.svg',
                buttonType: 'submit',
            }),
        })
    }

    componentDidUpdate(oldProps: {}, newProps: {}): boolean {
        if(oldProps === newProps){
          return false;
        }
        this.children.ChatInputField.setProps(newProps);
        return true;
      }

    init(){
        const chatInputBind = chatInputValidator.bind(this)
 
        const ChatInputField = new ChatInput({
            placeHolder: 'Сообщение',
            onBlur: chatInputBind,
        })

        this.children = {
            ...this.children,
            ChatInputField,
        }
    }

  

    //submit function
    //to-do -> console.log message
    onMessage(e:Event){
        e.preventDefault()
        console.log('messege sent')
    }



    render(): string {
        return(`
        <form class="chatAreaInput__input">
            {{{ChatInputField}}}
            <div class="chatAreaInput__send">
                {{{ArrowButton}}}
            </div>
        </form>
        `)
    }
}


