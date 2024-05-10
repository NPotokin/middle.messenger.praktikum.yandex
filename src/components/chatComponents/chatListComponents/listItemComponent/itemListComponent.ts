import Block from '../../../../core/Block.ts';
import store  from '../../../../core/Store.ts';
import ListItemComponent from './listItemComponent.ts';

export default class ItemListComponent extends Block {
  constructor(props:{}) {

    const listItems = store.getState().chats ? store.getState().chats!.reduce<{[key: string]: ListItemComponent}>((acc, itemConfig) => {
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



  

  render() {
    const LIKeys = this.props.listItemComponentKeys as string[];
    const listItemRender = LIKeys.map(key => `{{{ ${key} }}}`).join('');
    return `
            <div>
                ${listItemRender}
            </div>
        `;
  }
}
