import ChatController from '../../../../../controllers/chatController.ts';
import Block from '../../../../../core/Block.ts';
import store from '../../../../../core/Store.ts';

interface DeleteChatButtonInterface{
  onDeleteClick?: ()=> void
}
export default class DeleteChatButton extends Block{
  constructor(props:DeleteChatButtonInterface){
    super({
      ...props,
      events:{
        click: () => this.onDelete(),
      },
    });
  }

  async onDelete(){
    console.log('delete chat clicked');
    const id = store.getState().activeChat?.id;
    await ChatController.deleteChat({chatId: id});
    await ChatController.getChatsSetChats();
  }

  render(){
    return(`
            <div class="modalSmall__delete">
                <img 
                class="modalSmall__icon--delete"
                src="/icons/add.svg"></img>
                <p class="modalSmall__text">Удалить это чат</p>
            </div>
        `);
  }
}
