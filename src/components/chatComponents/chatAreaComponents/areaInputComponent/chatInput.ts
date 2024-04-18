import Block from "../../../../core/Block";

export default class ChatInput extends Block{
  constructor(props){
    super({
      ...props,
      events:{
        blur: props.onBlur,
      }
    })
  }

  render(){
    return(`
        <input 
        type="text" 
        id="{{inputId}}" 
        name="{{inputName}}" 
        value=""
        class="chatAreaInput__input--input" 
        placeholder="Сообщение">
    `)
  }
}