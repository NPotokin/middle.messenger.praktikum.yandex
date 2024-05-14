import Block from '../../../../core/Block.ts';

interface ChatInputInterface{
  inputId?: string,
  inputName?: string,
  onBlur?: () => void;
  placeHolder?: string,
}
export default class ChatInput extends Block{
  constructor(props: ChatInputInterface){
    super({
      ...props,
      events:{
        blur: props.onBlur,
      },
    });
  }

  render(){
    return(`
        <input 
        type="text" 
        id="{{inputId}}" 
        name="{{inputName}}" 
        value=""
        class="chatAreaInput__input--input" 
        placeholder={{placeHolder}}
        autofocus>
    `);
  }
}
