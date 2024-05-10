import store, {ChatData} from '../../../../core/Store.ts';
import { Image } from '../../../../ui/index.ts';
import Block from '../../../../core/Block.ts';
import connect from '../../../../utils/connect.ts';

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
        click: () => this.onClick()
      },
      Image: new Image({
        ...props,
        contSize: '__47',
      }),

    });
  }

  // componentDidUpdate(oldProps?:{chats:ChatData[]}, newProps?: {chats:ChatData[]}): boolean {
  //   if(oldProps === newProps){
  //     return false;
  //   }
  //   return true  
  // }
  // <-----Почему то работает и без CDU
  
  onClick() {
    //@ts-ignore
    store.setActiveChat(this.props.id);
    console.log('Item clicked:', this.props.id);
  }

  render() {
    const isActiveChat = store.getState().chats?.some(chat => chat.isActive && chat.id === this.props.id);
    const activeChatClass = isActiveChat ? ' listItem--active' : '';

    return(`
        <div class="listItem${activeChatClass}">
        <div class="listItem__image">
            {{{Image}}}
        </div>
        <div class="listItem__content">
            <p class="listItem__title">{{title}}</p>
            <p class="listItem__text">{{last_message.content}}</p>
        </div>
        <div class="listItem__info">
            <p class="listItem__date">{{last_message_time}}</p>
            <div class="listItem__badge{{LImodifier}}">{{unread_count}}</div>
        </div>
        </div>
        `);
  }
}

function mapStateToProps(store: { chats: ChatData[]}) { 
  return{     
    chats: store.chats
  }
}

export default connect(mapStateToProps)(ListItemComponent)
//   !!!!!   Возможно придется потом дополнить - как появятся данные из стора по сообщениям