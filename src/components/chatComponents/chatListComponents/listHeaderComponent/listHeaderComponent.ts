import Block from '../../../../core/Block';
import navigate from '../../../../utils/navigate';
import ListHeaderLink from './listHeaderLink';

export default class ListHeaderComponent extends Block{
  constructor(props){
    super({
      ...props,
      ListHeaderLink: new ListHeaderLink({
        ...props,
        onClick: () => navigate('profilePage'),
      }),
    });


  }

  render(){
    return(`
        <div class="listHeader">
        {{{ListHeaderLink}}}
        <div class="listHeader__search">
            <label 
            for="{{inputId}}" 
            class="listHeader__label">
            </label>
            <input 
            type="search" 
            id="{{inputId}}" 
            name="{{inputName}}" 
            value=""
            class="listHeader__input" 
            placeholder="Поиск">
        </div>
        </div>
    
        `);
  }
}