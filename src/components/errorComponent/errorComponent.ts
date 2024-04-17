import Block from "../../core/Block";
import { Button } from "../../ui";
import navigate from "../../modules/utils/navigate";

export default class ErrorComponent extends Block{
    constructor(props){
        super({
            ...props,
        })
    }

    init() {
        const navigateBind = navigate.bind(this);

        const BackToChatsButton = new Button({
            onClick: () => navigateBind('loginPage'),
            label: 'Назад к чатам',
            type: 'link',
          });

        this.children = {
            ...this.children,
            BackToChatsButton,
        }  
    }

    render(){
        return(`
        <div class="error">
            <h1 class="error__title">{{titleText}}</h1>
            <h2 class="error__subtitle">{{subTitleText}}</h2>
            {{{BackToChatsButton}}}
        </div>
        `);
    }
}