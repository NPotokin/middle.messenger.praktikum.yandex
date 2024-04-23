import Block from '../../core/Block.ts';



export default class InputErrorsText extends Block{
  constructor(props:{}){
    super({props});
  }
  render(){
    return(`
        <div class="input__text">{{inputText}}</div>
        `);
  }
}