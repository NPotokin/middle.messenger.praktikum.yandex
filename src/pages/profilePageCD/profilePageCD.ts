import Block from '../../core/Block';
import { ProfileCDModule } from '../../modules';

export default class ProfilePageCD extends Block{
  constructor(props){
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