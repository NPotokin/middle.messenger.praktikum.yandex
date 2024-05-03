import Block from '../../core/Block.ts';
import { Button } from '../../ui/index.ts';


export default class ErrorComponent extends Block{
  constructor(props:{}){
    super({
      ...props,
    });
  }

  init() {
    const BackToChatsButton = new Button({
      onClick: () => window.router.go('/chat'),
      label: 'Назад к чатам',
      type: 'link',
    });

    this.children = {
      ...this.children,
      BackToChatsButton,
    };
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
