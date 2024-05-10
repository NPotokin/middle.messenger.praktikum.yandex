import { UserData } from '../../components/userProfileComponents/index.ts';
import SignupController from '../../controllers/signupController.ts';
import Block from '../../core/Block.ts';
import { ArrowButton, Image, Button } from '../../ui/index.ts';
import store, {User} from '../../core/Store.ts';
import connect from '../../utils/connect.ts';


interface ProfileMainModuleInterface{
  user:{
    avatar?:string,
  }
}
class ProfileMainModule extends Block{
  constructor(props:ProfileMainModuleInterface){
    super({
      ...props,
      NameInChat: `${store.getState().user?.display_name == null
        ? 'Нужно придумать имя'
        : store.getState().user?.display_name}` ,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => window.router.go('/messenger'),
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'128px',
        contSize:'__128still',
        imgSrc: props.user.avatar
          ? `https://ya-praktikum.tech/api/v2/resources${props.user.avatar}`
          : 'icons/image.svg',

      }),
      ProfileInfo: new UserData({
        ...props,
      }),
      ChangeInfoButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить данные',
        onClick: () => window.router.go('/settings-change-data'),
      }),
      ChangePasswordButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить пароль',
        onClick: () => window.router.go('/settings-change-password'),
      }),
      ExitButton: new Button({
        ...props,
        type: 'link--profileError',
        label:'Выйти',
        onClick: () => SignupController.logoutUser(),
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
                        <p class="profile__title">{{NameInChat}}</p>
                        <div class="profile_info">
                            {{{ProfileInfo}}}
                        </div>
                        <div class="profile__actions">
                            {{{ChangeInfoButton}}}
                            {{{ChangePasswordButton}}}
                            {{{ExitButton}}}
                        </div>
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

export default connect(mapStateToProps)(ProfileMainModule);
