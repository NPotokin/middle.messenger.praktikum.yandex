import Block from '../../../core/Block.ts';


export default class UserInputErrorText extends Block{
  constructor(props: {}){
    super({
      ...props,
    });
  }

  render(){
    return(`
        <div class="userInput__text">{{inputText}}</div>
        `);
  }
}