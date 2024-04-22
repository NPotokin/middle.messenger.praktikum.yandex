import Block from '../../../../core/Block';
import ListItemComponent from './listItemComponent';
import {listItemConfigs} from './listItemConfigs';

export default class ItemListComponent extends Block {
  constructor(props) {

    const listItems = listItemConfigs.reduce((acc, itemConfig) => {
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
    const listItemHtml = this.props.listItemComponentKeys.map(key => `{{{ ${key} }}}`).join('');
    return `
            <div>
                ${listItemHtml}
            </div>
        `;
  }
}
