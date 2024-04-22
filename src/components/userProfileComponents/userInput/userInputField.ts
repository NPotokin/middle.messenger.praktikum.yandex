import Block from '../../../core/Block';

export default class UserInputField extends Block {
  constructor(props){
    super({
      ...props,
      events: {
        blur: props.onBlur,
      },
    });
  }

  render() {
    return(`
        <input 
        type="{{inputType}}" 
        id="{{inputId}}" 
        name="{{inputName}}" 
        value="{{inputValue}}"
        class="userInput__element" 
        placeholder="{{placeholder}}">
        `);

  }
}