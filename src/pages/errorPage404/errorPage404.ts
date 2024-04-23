import Block from '../../core/Block.ts';
import { ErrorComponent } from '../../components/index.ts';

export default class ErrorPage404 extends Block {
  constructor(props:{}){
    super({
      ...props,
      Error404: new ErrorComponent({
        ...props,
        titleText: '404',
        subTitleText: 'Не туда попали',
      }),
    });
  }

  render(){
    return(`
        <div>
        {{{Error404}}}
        </div>
        `);
  }
}