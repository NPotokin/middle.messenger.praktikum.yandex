import Block from '../../core/Block.ts';
import { AreaHeaderComponent, AreaContentComponent, AreaInputComponent } from '../../components/index.ts';

export default class ChatAreaModule extends Block{
  constructor(props:{}){
    super({
      ...props,
      AreaHeader: new AreaHeaderComponent({
        ...props,
      }),
      AreaContent: new AreaContentComponent({
        ...props,
      }),
      AreaInput: new AreaInputComponent({
        ...props,
      }),
    });
  }
  render(){
    return(`
            <div class="chatArea">
                {{{AreaHeader}}}
                {{{AreaContent}}}
                {{{AreaInput}}}
            </div>
            `);
  }
}
