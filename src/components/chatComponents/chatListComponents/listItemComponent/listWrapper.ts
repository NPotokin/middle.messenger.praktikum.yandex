import Block from '../../../../core/Block.ts';
import connect from '../../../../utils/connect.ts';
import { ChatData } from '../../../../core/Store.ts';


class ListWrapper extends Block {
  constructor(props: ChatData[]) {
    super({
      ...props,
    });
  }

  render(): string {
    return (`
        <div>
            {{{cards}}}
        </div>
        `);
  }
}


export default connect(({chats}) => ({chats}))(ListWrapper);
