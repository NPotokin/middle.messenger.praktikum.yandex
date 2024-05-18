import Block from '../../core/Block.ts';

// interface ErrorLineInterface{
//   ErrorText?: string,
//   error?: string,
// }
export default class ModalError extends Block {
  constructor(props: {}){
    super({
      ...props,
    });
  }

  render(){
    return(`
            <p class="errorLine">{{ErrorText}}</p>  
        `);
  }
}
