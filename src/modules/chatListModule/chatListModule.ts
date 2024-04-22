import Block from '../../core/Block';
import { ListHeaderComponent } from '../../components';
import { ItemListComponent } from '../../components/chatComponents/chatListComponents/listItemComponent';

export default class ChatListModule extends Block{
  constructor(props){
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

