import Block from '../../core/Block.ts';
import { ArrowButton } from '../../ui/index.ts';
import ProfileCDform from './profileCDform.ts';
interface ProfileCDModuleInterface{
  ErrorText?: string,
}
export default class ProfileCDModule extends Block{
  constructor(props: ProfileCDModuleInterface){
    super({
      ...props,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => window.router.go('/settings'),
      }),
      ProfileCDform: new ProfileCDform({
        ...props,
      }),
    });
  }


  render(){
    return(`
            <div class="profile">
                <div class="profile__buttonArea">
                    {{{BackButton}}}
                </div>
               {{{ProfileCDform}}}
            </div>
        `);
  }
}
