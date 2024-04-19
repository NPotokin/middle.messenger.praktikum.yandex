import Block from "../../core/Block";

export default class ArrowButton extends Block{
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
        <button class="arrowButton">
        <img src="{{src}}" 
             alt="{{alt}}" 
             class="arrowButton__image">
         </button>
        `)
    }
}