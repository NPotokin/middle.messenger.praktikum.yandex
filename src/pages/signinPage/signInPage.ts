import Block from '../../core/Block';
import { SignInModule } from '../../modules';

export default class SignInPage extends Block{
  constructor(props){
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