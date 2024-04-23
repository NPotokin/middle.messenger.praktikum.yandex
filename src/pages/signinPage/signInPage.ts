import Block from '../../core/Block.ts';
import { SignInModule } from '../../modules/index.ts';

export default class SignInPage extends Block{
  constructor(props:{}){
    super({
      ...props,
      SignInModule: new SignInModule({
        formAction: '',
      }),
    });
  }

  render(): string {
    return(`
              <div>
              {{{SignInModule}}}
              </div>
          `);
  }
}