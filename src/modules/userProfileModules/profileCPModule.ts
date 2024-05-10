import Block from '../../core/Block.ts';
import {User} from '../../core/Store.ts';
import { ArrowButton, Image } from '../../ui/index.ts';
import connect from '../../utils/connect.ts';
import ProfileCPform from './profileCPform.ts';

interface ProfileCPModuleInterface{
  ErrorText?: string,
  user:{
    avatar?: string
  }
}
class ProfileCPModule extends Block{
  constructor(props: ProfileCPModuleInterface){
    super({
      ...props,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => window.router.go('/settings'),
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'128px',
        contSize:'__128still',
        imgSrc: props.user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${props.user.avatar}`
          : 'icons/image.svg',
      }),
      ProfileCPform: new ProfileCPform({
        ...props,
      }),


    });
  }

  componentDidUpdate(oldProps: {user:User}, newProps: {user:User}): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.AvatarImage.setProps(
      {imgSrc:  `https://ya-praktikum.tech/api/v2/resources${newProps.user.avatar}`});
    return true;
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

function mapStateToProps(store: { user: User}) {
  return{
    user: store.user,
  };
}

export default connect(mapStateToProps)(ProfileCPModule);
