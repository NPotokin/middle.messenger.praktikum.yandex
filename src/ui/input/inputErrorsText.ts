import Block from '../../core/Block';

export default class InputErrorsText extends Block{
  constructor(props){
    super({
      ...props,
    });
  }
  render(){
    return(`
        <div class="input__text">{{inputText}}</div>
        `);
  }
}