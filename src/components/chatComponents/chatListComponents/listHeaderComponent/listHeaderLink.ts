import Block from '../../../../core/Block.ts';

interface LHLinterface{
  onClick?: () => void;
}
export default class ListHeaderLink extends Block{
  constructor(props: LHLinterface){
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
