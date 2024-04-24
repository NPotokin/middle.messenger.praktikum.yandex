import Block from '../../../../../core/Block.ts';

interface AddButtonInterface{
  onAddClick?: () => void;
}
export default class AddButton extends Block{
  constructor(props:AddButtonInterface){
    super({
      ...props,
      events:{
        click: props.onAddClick,
      },
    });
  }

  render(){
    return(`
            <div class="modalSmall__add">
                <img 
                class="modalSmall__icon--add"
                src="/icons/add.svg"></img>
                <p class="modalSmall__text">Добавить пользователя</p>
            </div>
        `);
  }
}
