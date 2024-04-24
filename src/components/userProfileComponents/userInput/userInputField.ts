import Block from '../../../core/Block.ts';

interface UIFinterface{
  onBlur?: () => void,
  inputType?: string,
  inputId?: string,
  inputName?: string,
  inputValue?: string,
  placeholder?: string,
}
export default class UserInputField extends Block {
  constructor(props: UIFinterface){
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
