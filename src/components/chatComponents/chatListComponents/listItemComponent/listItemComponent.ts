import Block from '../../../../core/Block.ts';
import { Image } from '../../../../ui/index.ts';


export default class ListItemComponent extends Block{
  constructor(props:{}){
    super({
      ...props,
      Image: new Image({
        ...props,
        contSize: '__47',
      }),

    });
  }

  render(){
    return(`
        <div class="listItem {{#if active}}listItem--active{{/if}}">
        <div class="listItem__image">
            {{{Image}}}
        </div>
        <div class="listItem__content">
            <p class="listItem__title">{{title}}</p>
            <p class="listItem__text">{{last_message.content}}</p>
        </div>
        <div class="listItem__info">
            <p class="listItem__date">{{last_message_time}}</p>
            <div class="listItem__badge{{LImodifier}}">{{unread_count}}</div>
        </div>
        </div>
    
        `);
  }
}
