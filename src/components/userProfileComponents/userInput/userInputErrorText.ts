import Block from "../../../core/Block";

export default class UserInputErrorText extends Block{
    constructor(props){
        super({
            ...props,
        })
    }

    render(){
        return(`
        <div class="userInput__text">{{inputText}}</div>
        `)
    }
}