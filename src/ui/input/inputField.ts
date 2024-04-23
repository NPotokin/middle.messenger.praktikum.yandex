import Block from '../../core/Block.ts';

interface InputFieldProps {
  onBlur?: () => void;
  onChange?: (event: Event) => void;
  inputType?: string;
  inputId?: string;
  inputName?: string;
  inputValue?: string;
  modifier?: string;
  placeholder?: string;
  
}

export default class InputField extends Block {
  constructor(props: InputFieldProps) {
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
