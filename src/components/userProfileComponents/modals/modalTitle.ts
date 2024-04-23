import Block from '../../../core/Block.ts';

interface MTinterface{
  ModalTitleText: string,
}
export default class ModalTitle extends Block {
  constructor(props: MTinterface){
    super({
      ...props,
    });
  }

  render(){
    return(`
            <h2 class="modal__title">{{ModalTitleText}}</h2>
        `);
  }
}