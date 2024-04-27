import Block from "../../../../core/Block.ts";
import ChatInput from './chatInput.ts';
import { ArrowButton, ErrorLine} from '../../../../ui/index.ts';
import chatInputValidator from "../../../../utils/inputValidators/chatInputValidator.ts";

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
                submit: (e:Event) => this.onMessage(e)
            },
            ArrowButton: new ArrowButton({
                ...props,
                src: '/icons/arrow-right.svg',
                buttonType: 'submit',
            }),
            ErrorLine: new ErrorLine({
                ...props,
                error: props.ErrorText,
            })
        })
    }

    componentDidUpdate(oldProps: {}, newProps: {}): boolean {
        if(oldProps === newProps){
          return false;
        }
        this.children.ErrorLine.setProps(newProps);
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

  

    
    //to-do -> fix blur event with fixing types
    onMessage(e:Event){
        e.preventDefault()
        this.children.ChatInputField.props.onBlur


        const message = this.props.message
        console.log(message)
            
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
        `)
    }
}


