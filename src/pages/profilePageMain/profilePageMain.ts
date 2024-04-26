import Block from '../../core/Block.ts';
import { ProfileMainModule } from '../../modules/index.ts';

export default class ProfilePageMain extends Block{
  constructor(props:{}){
    super({
      ...props,
      ProfileMainModule: new ProfileMainModule({
        ...props,
      }),
    });


  }

  render(){
    return(`
        <div>
            {{{ProfileMainModule}}}
        </div>
        `);
  }
}
