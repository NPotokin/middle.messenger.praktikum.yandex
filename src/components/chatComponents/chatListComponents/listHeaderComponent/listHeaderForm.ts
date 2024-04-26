import Block from "../../../../core/Block.ts";

interface ListHeaderFormInterface{
    inputId?: string,
    inputName?: string,
}

export default class ListHeaderForm extends Block{
    constructor(props: ListHeaderFormInterface){
        super({
            ...props,
            events:{
                submit: (e:Event) => this.onNameSearch(e),
            }
        })
    }

    onNameSearch(e:Event){
        e.preventDefault();
        console.log(`Search in message submitted`)

    }

    render(): string {
        return(`
        <form action='' class="listHeader__search">
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
        </form>
        `)
    }
}