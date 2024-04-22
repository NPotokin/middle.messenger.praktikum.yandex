import Block from '../../core/Block';
import { ProfileMainModule } from '../../modules';

export default class ProfilePageMain extends Block{
  constructor(props){
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