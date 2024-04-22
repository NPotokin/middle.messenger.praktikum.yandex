import Block from '../../core/Block';
import { ProfileCPModule } from '../../modules';

export default class ProfilePageCP extends Block{
  constructor(props){
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