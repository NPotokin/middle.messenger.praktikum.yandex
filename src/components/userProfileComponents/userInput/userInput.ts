import Block from '../../../core/Block';
import UserInputField from './userInputField';
import UserInputErrorText from './userInputErrorText';

export default class UserInput extends Block {
  constructor(props){
    super({
      ...props,
      UserInputField: new UserInputField({
        ...props,
      }),
      UserInputErrorText: new UserInputErrorText({
        error: props.inputText,
      }),

    });
  }

  componentDidUpdate(oldProps: any, newProps: any): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.UserInputErrorText.setProps(newProps);
    return true;
  }

  render(): string {
    return(`
        <div class="userInput {{userInputContainerClass}}">
            <label 
            for="{{inputId}}" 
            class="userInput__label">
            {{label}}
            </label>
            {{{UserInputField}}}
            {{{UserInputErrorText}}}
        </div>
        `);
  }
}