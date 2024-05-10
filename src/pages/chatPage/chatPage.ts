import { InactiveAreaComponent } from '../../components/index.ts';
import Block from '../../core/Block.ts';
import store, {ChatData} from '../../core/Store.ts';
import { ChatListModule, ChatAreaModule } from '../../modules/index.ts';
import connect from '../../utils/connect.ts';

class ChatPage extends Block{
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
        ...props,
      }),
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

function mapStateToProps(store: { chats: ChatData[]}) {
  return{
    chats: store.chats,
  };
}

export default connect(mapStateToProps)(ChatPage);
