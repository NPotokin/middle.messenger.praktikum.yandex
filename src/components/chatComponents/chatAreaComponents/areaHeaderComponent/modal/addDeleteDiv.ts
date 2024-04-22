import Block from '../../../../../core/Block';

export default class AddDeleteDiv extends Block{
  constructor(props){
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