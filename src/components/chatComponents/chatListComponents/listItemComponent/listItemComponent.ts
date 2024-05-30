import store, {ChatData} from '../../../../core/Store.ts';
import { Image } from '../../../../ui/index.ts';
import Block from '../../../../core/Block.ts';
import connect from '../../../../utils/connect.ts';
import ChatController from '../../../../controllers/chatController.ts';
import wsService from '../../../../core/WebSocket.ts';

interface ChatInterface{
  chat:{
    isActive?: boolean,
    id?: number,
  }
}
class ListItemComponent extends Block{
  constructor(props: ChatInterface){
    super({
      ...props,
      events:{
        click: () => this.onClick(),
      },
      Image: new Image({
        ...props,
        contSize: '__47',
        imgSize: '45px',
        // imgSrc: `https://ya-praktikum.tech/api/v2/resources${store.getState()
        //   .chats?.find(chat => chat.isActive)?.last_message?.user?.avatar}`,
        // need to have either CDU or map to id or something
        // seems like it would be easier to set up chat avatar here
      }),

    });
  }

  async onClick() {
    const chatId = this.props.id as number;
    store.setActiveChatID(chatId);
    console.log('Item clicked:', chatId);
    store.setActiveChat(chatId);

    const chatID = store.getState().activeChat?.id as number;
    await ChatController.getTokenSetToken(chatID);
    const token = store.getState().token as string;

    // Ensure the old connection is closed before opening a new one
    await wsService.closeConnection();
    wsService.openConnection(chatID, token);

    await wsService.getOldMessages();

    await ChatController.getChatsSetChats();
    store.setActiveChat(chatId);
  }


  render() {
    const isActiveChat = store.getState().chats?.some(chat => chat.isActive && chat.id === this.props.id);
    const activeChatClass = isActiveChat ? ' listItem--active' : '';
    return (`
      <div class="listItem${activeChatClass}">
        <div class="listItem__image">
          {{{Image}}}
        </div>
        <div class="listItem__content">
          <p class="listItem__title">{{title}}</p>
          <p class="listItem__text">{{messageContent}}</p>
        </div>
        <div class="listItem__info">
          <p class="listItem__date">{{messageTime}}</p>
          <div class="listItem__badge{{LImodifier}}">{{unreadCount}}</div>
        </div>
      </div>
    `);
  }
}

function mapStateToProps(store: { chats: ChatData[] }) {
  return {
    chats: store.chats,
  };
}

export default connect(mapStateToProps)(ListItemComponent);
