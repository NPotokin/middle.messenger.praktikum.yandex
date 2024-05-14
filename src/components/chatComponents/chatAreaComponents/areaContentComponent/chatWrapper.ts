import Block from '../../../../core/Block.ts';
import connect from '../../../../utils/connect.ts';
import { SocketMessage } from '../../../../core/Store.ts';


class ChatWrapper extends Block {
  constructor(props: SocketMessage[]) {
    super({
      ...props,
    });
  }

  render(): string {
    console.log(this.props.messages);
    return `
        <div class="chatAreaContent">
            {{{messages}}}
        </div>
        `;
  }
}


export default connect(({messages}) => ({messages}))(ChatWrapper);