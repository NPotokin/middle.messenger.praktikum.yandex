import Block from '../../core/Block';
import { ErrorComponent } from '../../components';

export default class ErrorPage500 extends Block {
  constructor(props){
    super({
      ...props,
      Error500: new ErrorComponent({
        ...props,
        titleText: '500',
        subTitleText: 'Мы уже фиксим',
      }),
    });
  }

  render(){
    return(`
        <div>
        {{{Error500}}}
        </div>
        `);
  }
}