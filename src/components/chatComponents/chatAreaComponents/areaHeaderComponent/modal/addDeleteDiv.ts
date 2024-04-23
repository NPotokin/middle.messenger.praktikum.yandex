import Block from '../../../../../core/Block.ts';

interface AddDeleteDivInterface{
  onClick?: () => void,
}
export default class AddDeleteDiv extends Block{
  constructor(props: AddDeleteDivInterface){
    super({
      ...props,
      events:{
        click: props.onClick,
      },
    });


  }

  render(){
    return(`
            <div class="chatAreaHeader__menu"></div>
        `);
  }
}