
import Block from '../../../../../core/Block.ts';

interface AddAvatarButtonInterface{
  onAddClick?: () => void;
}
export default class AddAvatarButton extends Block{
  constructor(props:AddAvatarButtonInterface){
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
                src="/icons/attachMedia.svg"></img>
                <p class="modalSmall__text">Добавить аватар чата</p>
            </div>
        `);
  }
}
