import Block, { BlockInterface } from '../../core/Block.ts';
import { ListHeaderComponent } from '../../components/index.ts';
import { ItemListComponent } from '../../components/chatComponents/chatListComponents/listItemComponent/index.ts';
import connect from '../../utils/connect.ts';
import store, {ChatData} from '../../core/Store.ts';
export default class ChatListModule extends Block{
  constructor(props:{}){
    super({
      ...props,
      ListHeader: new ListHeaderComponent({
        ...props,
        inputId:'searchChat',
        inputName: 'searchChat',
      }),
      ItemList: new ItemListComponent({
        ...props,
      }),

    });
  }

  // componentDidUpdate(oldProps?: {}, newProps?: {}): boolean {
  //   console.log('old pros:', oldProps)
  //   console.log('new pros:', newProps)
  //   console.log('children:', this.children.ItemList.children)
  //   if(oldProps === newProps){
  //     return false
  //   }


  //   return true
  // }

  render(){
    return(`
        <div>
            {{{ListHeader}}}
            {{{ItemList}}}
        </div>
        `);
  }
}

// function mapStateToProps(store: { chats: ChatData[]}) {
//   return{
//     chats: store.chats,
//   };
// }

// export default connect(mapStateToProps)(ChatListModule);

