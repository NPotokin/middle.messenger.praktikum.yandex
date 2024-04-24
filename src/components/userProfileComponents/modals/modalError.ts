import Block from '../../../core/Block.ts';

export default class ModalError extends Block {
  constructor(props:{}){
    super({
      ...props,
    });
  }

  render(){
    return(`
            <p class="modal--error">Нужно выбрать файл</p>  
        `);
  }
}
