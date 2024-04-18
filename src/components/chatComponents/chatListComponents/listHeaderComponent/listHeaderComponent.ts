import Block from "../../../../core/Block";

export default class ListHeaderComponent extends Block{
    constructor(props){
        super({
            ...props,
        })
    }

    render(){
        return(`
        <div class="listHeader">
        <a href="" class="listHeader__link">Профиль > </a>
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
    
        `)
    }
}