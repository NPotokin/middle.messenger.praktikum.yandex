import Block from '../../core/Block';

export default class InputField extends Block {
  constructor(props){
    super({
      ...props,
      events: {
        blur: props.onBlur,
        change: props.onChange,
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
        class="input__element {{modifier}}" 
        placeholder="{{placeholder}}">
        `);

  }
}