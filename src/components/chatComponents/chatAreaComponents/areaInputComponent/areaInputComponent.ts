import Block from '../../../../core/Block';
import { ArrowButton} from '../../../../ui';
import AttachDiv from './attachDiv';
import ChatInput from './chatInput';


export default class AreaInputComponent extends Block{
  constructor(props){
    super({
      ...props,
      ArrowButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-right.svg',
      }),
      AttachDiv: new AttachDiv({
        ...props,
      }),
      ChatInput: new ChatInput({
        ...props,
        onBlur: ()=>{console.log('По ТЗ необязательно');},
      }),

    });


  }

  render(){
    return(`
    <div class="chatAreaInput">
    {{{AttachDiv}}}
    <form class="chatAreaInput__input">
        {{{ChatInput}}}
    </form>
    <div class="chatAreaInput__send">
        {{{ArrowButton}}}
    </div>
</div>
    `);
  }
}