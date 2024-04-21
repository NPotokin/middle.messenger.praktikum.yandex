import Block from "../../../../core/Block";
import navigate from "../../../../modules/utils/navigate";

export default class ListHeaderLink extends Block{
    constructor(props){
        super({
            ...props,
            events:{
                click: props.onClick,
            }
        })
    }
    render(){
        return(`
            <button class="listHeader__link">Профиль > </button>
        `)
    }
}