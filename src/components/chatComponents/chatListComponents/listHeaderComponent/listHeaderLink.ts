import Block from '../../../../core/Block';

export default class ListHeaderLink extends Block{
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
            <button class="listHeader__link">Профиль > </button>
        `);
  }
}