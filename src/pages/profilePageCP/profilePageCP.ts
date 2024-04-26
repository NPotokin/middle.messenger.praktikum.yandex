import Block from '../../core/Block.ts';
import { ProfileCPModule } from '../../modules/index.ts';

export default class ProfilePageCP extends Block{
  constructor(props:{}){
    super({
      ...props,
      ProfileCPModule: new ProfileCPModule({
        ...props,
      }),
    });


  }

  render(){
    return(`
        <div>
            {{{ProfileCPModule}}}
        </div>
        `);
  }
}
