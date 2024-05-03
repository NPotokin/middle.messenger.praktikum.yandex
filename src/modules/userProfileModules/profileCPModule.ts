import Block from '../../core/Block.ts';
import { ArrowButton, Image } from '../../ui/index.ts';
import ProfileCPform from './profileCPform.ts';

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
        onClick: () => window.router.go('/profile'),
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'40px',
        contSize:'__128still',
        imgSrc:'/icons/image.svg',
      }),
      ProfileCPform: new ProfileCPform({
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
                <div class="profile__main">
                    <div class="profileContainer">
                        {{{AvatarImage}}}
                        {{{ProfileCPform}}}
                    </div>
                </div>
            </div>
        `);
  }
}
