import Block from '../../core/Block.ts';
import InputField from './inputField.ts';
import InputErrorsText from './inputErrorsText.ts';

interface InputProps {
  inputText: string;
  inputClass: string;
  label: string;
  inputId: string;
  // Add other props as needed
  // For example:
  placeholder: string;
  // Add other props as needed
}

export default class Input extends Block {
  constructor(props: InputProps){
    super({
      ...props,
      InputField: new InputField(props),
      InputErrorsText: new InputErrorsText({
        error: props.inputText,
      }),

    });
  }

  componentDidUpdate(oldProps: string, newProps: string): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.InputErrorsText.setProps(newProps);
    return true;
  }

  render(): string {
    return(`
        <div class="input{{inputClass}}">
            {{{InputField}}}
            <label 
            for="{{inputId}}" 
            class="input__label">
            {{label}}
            </label>
            {{{InputErrorsText}}}
        </div>
        `);
  }
}