import Block from '../../core/Block.ts';
import { AreaHeaderComponent, AreaContentComponent, AreaInputComponent } from '../../components/index.ts';
import chatWrapper from '../../components/chatComponents/chatAreaComponents/areaContentComponent/chatWrapper.ts';
import store, { SocketMessage } from '../../core/Store.ts';
import connect from '../../utils/connect.ts';
class ChatAreaModule extends Block{
  constructor(props:{}){
    super({
      ...props,
      AreaHeader: new AreaHeaderComponent({
        ...props,
      }),
      AreaInput: new AreaInputComponent({
        ...props,
      }),
    });
  }

  init(){

    const MessageList = new chatWrapper({messages: this.mapChatWrapper(store.getState().messages!) || []});

    this.children = {
      ...this.children,
      MessageList,
    };
  }

  mapChatWrapper(chatItem: SocketMessage[]){
    return chatItem?.map(({id, chat_id, user_id, content, time}) =>
      new AreaContentComponent({
        modifier: user_id === store.getState().user?.id 
        ? 'outbound'
        : 'inbound',
        text: content,
        date: time,
        chatID: chat_id,
        userID: user_id,
        lastMessageID: id
      }));
  }

  componentDidUpdate(oldProps: {messages: SocketMessage[]}, newProps: {messages: SocketMessage[]}): boolean {
    if(oldProps.messages !== newProps.messages) {
      this.children.MessageList.setProps({
        messages: this.mapChatWrapper(newProps.messages) || [],
      });
    }
    return true;
  }

  render(){
    return(`
            <div class="chatArea">
                {{{AreaHeader}}}
                {{{MessageList}}}
                {{{AreaInput}}}
            </div>
            `);
  }
}

export default connect(({messages}) => ({messages}))(ChatAreaModule);
