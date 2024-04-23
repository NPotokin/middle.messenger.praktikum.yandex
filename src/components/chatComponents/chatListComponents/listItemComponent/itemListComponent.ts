import Block from '../../../../core/Block.ts';
import ListItemComponent from './listItemComponent.ts';
import {listItemConfigs} from './listItemConfigs.ts';

export default class ItemListComponent extends Block {
  constructor(props:{}) {

    const listItems = listItemConfigs.reduce<{[key: string]: ListItemComponent}>((acc:any, itemConfig) => {
      const listItem = new ListItemComponent(itemConfig);
      acc[listItem._id] = listItem;
      return acc;
    }, {});

    super({
      ...props,
      listItemComponentKeys: Object.keys(listItems),
      ...listItems,
    });
  }

  render() {
    const LIKeys = this.props.listItemComponentKeys as string[]
    const listItemRender = LIKeys.map(key => `{{{ ${key} }}}`).join('');
    return `
            <div>
                ${listItemRender}
            </div>
        `;
  }
}
