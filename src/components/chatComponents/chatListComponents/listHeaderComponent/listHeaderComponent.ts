import Block from '../../../../core/Block.ts';
import ListHeaderLink from './listHeaderLink.ts';
import ListHeaderForm from './listheaderForm.ts';

interface ListHeaderComponentInterface{
  inputId?: string,
  inputName?: string,

}
export default class ListHeaderComponent extends Block{
  constructor(props:ListHeaderComponentInterface){
    super({
      ...props,
      ListHeaderLink: new ListHeaderLink({
        ...props,
        onClick: () => window.router.go('/settings'),
      }),
      ListHeaderForm: new ListHeaderForm({...props}),
    });


  }

  render(){
    return(`
        <div class="listHeader">
          {{{ListHeaderLink}}}
          {{{ListHeaderForm}}}
        </div>
    
        `);
  }
}
