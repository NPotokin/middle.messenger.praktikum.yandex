import Block from '../../core/Block.ts';
import { ProfileCDModule } from '../../modules/index.ts';

export default class ProfilePageCD extends Block{
  constructor(props:{}){
    super({
      ...props,
      ProfileCDModule: new ProfileCDModule({
        ...props,
      }),
    });


  }

  render(){
    return(`
        <div>
            {{{ProfileCDModule}}}
        </div>
        `);
  }
}