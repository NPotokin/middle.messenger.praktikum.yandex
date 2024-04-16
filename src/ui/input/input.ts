import Block from "../../core/Block";
import InputField from "./inputField";
import InputErrorsText from "./inputErrorsText";

export default class Input extends Block {
    constructor(props){
        super({
            ...props,
            InputField: new InputField({
                ...props,
            }),
            InputErrorsText: new InputErrorsText({
                error: props.inputText,
            })
            
        })
    }

    componentDidUpdate(oldProps: any, newProps: any): boolean {
        if(oldProps === newProps){
            return false;
        }
        this.children.InputErrorsText.setProps(newProps);
        return true;
    }

    render(): string {
        return(`
        <div class="input">
            {{{InputField}}}
            <label 
            for="{{inputId}}" 
            class="input__label">
            {{label}}
            </label>
            {{{InputErrorsText}}}
        </div>
        `)
    }
}