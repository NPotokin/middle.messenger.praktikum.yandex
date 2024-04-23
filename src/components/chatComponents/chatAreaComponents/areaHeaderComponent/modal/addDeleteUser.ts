import Block from '../../../../../core/Block.ts';
import AddButton from './addButton.ts';
import DeleteButton from './deleteButton.ts';

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
    });
  }

  render(){
    return(`
        <div class="modalSmall">
            {{{AddButton}}}
            {{{DeleteButton}}}
        </div>
        `);
  }
}