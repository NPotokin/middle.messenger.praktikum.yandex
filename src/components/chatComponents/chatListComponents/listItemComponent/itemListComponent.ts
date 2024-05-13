import ChatController from '../../../../controllers/chatController.ts';
import Block, { BlockInterface } from '../../../../core/Block.ts';
import store, {AppState, ChatData}  from '../../../../core/Store.ts';
import connect from '../../../../utils/connect.ts';
import ListItemComponent from './listItemComponent.ts';
import listWrapper from './listWrapper.ts';


class ItemListComponent extends Block{
  
  init(){

    const ChatList = new listWrapper({cards: this.mapListWrapper(store.getState().chats!) || []})

    this.children = {
      ChatList
    }
  }

  mapListWrapper(listItem:ChatData[]){
    return listItem?.map(({title}) => new ListItemComponent({title: title}))
  }


  render(): string {
    return(`
        <div>
          {{{ChatList}}}
        </div>
    `)
  }
}

export default connect(({chats}) => ({chats}))(ItemListComponent)








// class ItemListComponent extends Block {
//   constructor(props: AppState) {
//     const listItems = props.chats ? props.chats!
//       .reduce<{[key: string]: ListItemComponent}>((acc, itemConfig) => {
//         const listItem = new ListItemComponent(itemConfig);
//         acc[listItem._id] = listItem;
//         return acc;
//       }, {}) : {};
//     super({
//       ...props,
//       listItemComponentKeys: Object.keys(listItems),
//       ...listItems,
//     });
//   }

//   componentDidUpdate(oldProps?:{} , newProps?: {}): boolean {
//     console.log('list CDU old', oldProps);
//     console.log('list CDU new', newProps);
//     if(oldProps === newProps){
//       return false;
//     }
//     // <----- Боль, Страдание, Непонимание
//     return true;
//   }


//   render() {
//     const LIKeys = this.props.listItemComponentKeys as string[];
//     const listItemRender = LIKeys.map(key => `{{{ ${key} }}}`).join('');
//     return (`
//             <div>
//                 ${listItemRender}
//             </div>
//         `);
//   }
// }

// function mapStateToProps(store: { chats: ChatData[]}) {
//   return{
//     chats: store.chats,
//   };
// }

// export default connect(mapStateToProps)(ItemListComponent);

