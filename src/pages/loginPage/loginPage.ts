import Block from '../../core/Block.ts';
import { LoginModule } from '../../modules/index.ts';

export default class LoginPage extends Block{
  constructor(props:{}){
    super({
      ...props,
      LoginModule: new LoginModule({
        formAction: '',
      }),
    });
  }

  render(): string {
    return(`
            <div>
            {{{LoginModule}}}
            </div>
        `);
  }
}
