import Block from '../../core/Block';
import { LoginModule } from '../../modules';

export default class LoginPage extends Block{
  constructor(props){
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