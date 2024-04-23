import Block from '../../../core/Block.ts';
import UserInputField from './userInputField.ts';
import UserInputErrorText from './userInputErrorText.ts';

interface userInputInterface {
  userInputContainerClass?: string,
  inputId?: string,
  label?: string,
  UserInputField?: string,
  UserInputErrorText?: string,
  inputText?: string,
  error?: string,
  inputName?: string,
  inputType?: string,
  inputValue?: string,
  onBlur?: () => void,
}
export default class UserInput extends Block {
  constructor(props: userInputInterface){
    super({
      ...props,
      UserInputField: new UserInputField({...props}),
      UserInputErrorText: new UserInputErrorText({
        error: props.inputText,
      }),

    });
  }

  componentDidUpdate(oldProps: {}, newProps: {}): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.UserInputErrorText.setProps(newProps);
    return true;
  }

  render(): string {
    return(`
      <div>
        <div class="userInput {{userInputContainerClass}}">
          <label 
          for="{{inputId}}" 
          class="userInput__label">
          {{label}}
          </label>
          {{{UserInputField}}}
        </div>
        {{{UserInputErrorText}}}
      </div>
        `);
  }
}