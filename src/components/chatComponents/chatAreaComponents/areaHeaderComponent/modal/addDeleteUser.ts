import Block from '../../../../../core/Block';
import AddButton from './addButton';
import DeleteButton from './deleteButton';

export default class AddDeleteMain extends Block{
  constructor(props){
    super({
      ...props,
      AddButton: new AddButton({
        ...props,

      }),
      DeleteButton: new DeleteButton({
        ...props,
        // onClick:()=>{console.log('delete clicked')},
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