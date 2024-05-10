import Block from '../../../../core/Block.ts';
import store, {ChatData}  from '../../../../core/Store.ts';
import connect from '../../../../utils/connect.ts';
import ListItemComponent from './listItemComponent.ts';


class ItemListComponent extends Block {
  constructor(props:{}) {
    const listItems = store.getState().chats ? store.getState().chats!
      .reduce<{[key: string]: ListItemComponent}>((acc, itemConfig) => {
        const listItem = new ListItemComponent(itemConfig);
        acc[listItem._id] = listItem;
        return acc;
      }, {}) : {};
    super({
      ...props,
      listItemComponentKeys: Object.keys(listItems),
      ...listItems,
    });
  }

  componentDidUpdate(oldProps?:{} , newProps?: {}): boolean {
    console.log('list CDU', oldProps)
    console.log('list CDU', newProps)    
    if(oldProps === newProps){
      return false;
    }

    return true
  }


  render() {
    console.log('this', this.children)

    const LIKeys = this.props.listItemComponentKeys as string[];
    const listItemRender = LIKeys.map(key => `{{{ ${key} }}}`).join('');
    return (`
            <div>
                ${listItemRender}
            </div>
        `);
  }
}

function mapStateToProps(store: { chats: ChatData[]}) {
  return{
    chats: store.chats,
  };
}

export default connect(mapStateToProps)(ItemListComponent);

