import Block from '../../core/Block';


export default class ModalError extends Block {
  constructor(props){
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