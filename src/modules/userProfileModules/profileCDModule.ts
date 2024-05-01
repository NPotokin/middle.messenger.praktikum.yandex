import Block from '../../core/Block.ts';
import { ArrowButton } from '../../ui/index.ts';
// import navigate from '../../utils/navigate.ts';
import ProfileCDform from './profileCDform.ts';
interface ProfileMainModuleInterface{
  ErrorText?: string,
}
export default class ProfileMainModule extends Block{
  constructor(props: ProfileMainModuleInterface){
    super({
      ...props,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => {},
        // onClick: () => navigate('profilePage'),
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
