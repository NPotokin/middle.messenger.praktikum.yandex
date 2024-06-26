import Block from '../../../../../core/Block.ts';

interface DeleteButtonInterface{
  onDeleteClick?: ()=> void
}
export default class DeleteButton extends Block{
  constructor(props:DeleteButtonInterface){
    super({
      ...props,
      events:{
        click: props.onDeleteClick,
      },
    });
  }

  render(){
    return(`
            <div class="modalSmall__delete">
                <img 
                class="modalSmall__icon--delete"
                src="/icons/add.svg"></img>
                <p class="modalSmall__text">Удалить пользователя</p>
            </div>
        `);
  }
}
