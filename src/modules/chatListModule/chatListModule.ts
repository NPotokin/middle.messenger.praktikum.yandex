import Block from '../../core/Block.ts';
import { ListHeaderComponent } from '../../components/index.ts';
import { ItemListComponent } from '../../components/chatComponents/chatListComponents/listItemComponent/index.ts';

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

  render(){
    return(`
        <div>
            {{{ListHeader}}}
            {{{ItemList}}}
              
        </div>
        `);
  }
}

