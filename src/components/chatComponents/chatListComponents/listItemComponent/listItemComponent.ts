import Block from "../../../../core/Block";
import { Image } from "../../../../ui";

export default class ListItemComponent extends Block{
    constructor(props){
        super({
        ...props,
        Image: new Image({
            ...props,
            contSize: '__47'
        })

        })
    }

    render(){
        return(`
        <div class="listItem {{#if active}}listItem--active{{/if}}">
        <div class="listItem__image">
            {{{Image}}}
        </div>
        <div class="listItem__content">
            <p class="listItem__title">{{LItitle}}</p>
            <p class="listItem__text">{{LItext}}</p>
        </div>
        <div class="listItem__info">
            <p class="listItem__date">{{LIdate}}</p>
            <div class="listItem__badge{{LImodifier}}">{{LIbadge}}</div>
        </div>
        </div>
    
        `)
    }
}