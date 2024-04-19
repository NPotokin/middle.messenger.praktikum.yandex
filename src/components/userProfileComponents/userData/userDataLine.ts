import Block from "../../../core/Block"

export default class UserDateLine extends Block{
    constructor(props){
        super({
            ...props,
        })
    }

    render(){
        return(`
        <div class="userData">
            <p class="userData__key">{{userKey}}</p>
            <p class="userData__value">{{userValue}}</p>
        </div>
        `)
    }
}