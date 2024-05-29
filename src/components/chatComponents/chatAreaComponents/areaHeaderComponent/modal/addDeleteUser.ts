import Block from '../../../../../core/Block.ts';
import AddAvatarButton from './addAvatarButton.ts';
import AddButton from './addButton.ts';
import DeleteButton from './deleteButton.ts';
import DeleteChatButton from './deleteChatButton.ts';

export default class AddDeleteMain extends Block{
  constructor(props:{}){
    super({
      ...props,
      AddButton: new AddButton({
        ...props,
      }),
      DeleteButton: new DeleteButton({
        ...props,
      }),
      AttachAvatar: new AddAvatarButton({
        ...props,
      }),
      DeleteChat: new DeleteChatButton({
        ...props,
      }),
    });
  }

  render(){
    return(`
        <div class="modalSmall">
            {{{AddButton}}}
            {{{DeleteButton}}}
            {{{AttachAvatar}}}
            {{{DeleteChat}}}
        </div>
        `);
  }
}
