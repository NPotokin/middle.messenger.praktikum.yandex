import { InactiveAreaComponent } from '../../components/index.ts';
import Block from '../../core/Block.ts';
import store from '../../core/Store.ts';
import { ChatListModule, ChatAreaModule } from '../../modules/index.ts';

export default class ChatPage extends Block{
  constructor(props:{}){
    super({
      ...props,
      ChatList: new ChatListModule({
        ...props,
      }),
      ChatArea: new ChatAreaModule({
        ...props,
      }),
      InactiveAreaComponent: new InactiveAreaComponent({
        ...props
      })
    });
  }

  render(): string {
    const activeChat = store.getState().chats?.find(chat => chat.isActive);
    const chatAreaContent = activeChat ? '{{{ChatArea}}}' : '{{{InactiveAreaComponent}}}';

    return `
      <div class="block">
        <div class="chat">
          <div class="chatList">{{{ChatList}}}</div>
          <div class="chatArea">${chatAreaContent}</div> 
        </div>
      </div>
    `;
  }
}
