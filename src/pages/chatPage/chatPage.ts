import Block from '../../core/Block.ts';
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
    });
  }
  render(): string {
    return(`

            <div class="block">
              <div class="chat">
                <div class="chatList">{{{ChatList}}}</div>
                <div class="chatArea">{{{ChatArea}}}</div>
              </div>
            </div>
            `);
  }

}
