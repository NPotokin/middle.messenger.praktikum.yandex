import Block from '../../../../core/Block.ts';
import store, { ChatData }  from '../../../../core/Store.ts';
import connect from '../../../../utils/connect.ts';
import ListItemComponent from './listItemComponent.ts';
import listWrapper from './listWrapper.ts';


class ItemListComponent extends Block{
  init(){

    const ChatList = new listWrapper({cards: this.mapListWrapper(store.getState().chats!) || []});

    this.children = {
      ChatList,
    };
  }

  mapListWrapper(listItem:ChatData[]){
    return listItem?.map(({title, id, unread_count, last_message }) =>
      new ListItemComponent({
        title: title,
        id: id,
        messageContent: last_message?.content,
        messageTime: last_message?.time,
        //next two lines might need fixing
        LImodifier: unread_count! > 0 ? '' : 'none',
        unreadCount: unread_count! > 0 ? unread_count : '',
      }));
  }

  componentDidUpdate(oldProps: {chats: ChatData[]}, newProps: {chats: ChatData[]}): boolean {
    if(oldProps.chats !== newProps.chats) {
      this.children.ChatList.setProps({
        cards: this.mapListWrapper(newProps.chats) || [],
      });
    }
    return true;
  }


  render(): string {
    return(`
        <div>
          {{{ChatList}}}
        </div>
    `);
  }
}

export default connect(({chats}) => ({chats}))(ItemListComponent);


