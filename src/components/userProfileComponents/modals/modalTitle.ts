import Block from "../../../core/Block";

export default class ModalTitle extends Block {
    constructor(props){
        super({
            ...props,
        })
    }

    render(){
        return(`
            <h2 class="modal__title">{{ModalTitleText}}</h2>
        `)
    }
}