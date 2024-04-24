import Block from '../../../../core/Block.ts';
import { ArrowButton} from '../../../../ui/index.ts';
import AttachDiv from './attachDiv.ts';
import ChatInput from './chatInput.ts';


export default class AreaInputComponent extends Block{
  constructor(props :{}){
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
        onBlur: ()=>{console.log('По Checklist необязательно');},
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
