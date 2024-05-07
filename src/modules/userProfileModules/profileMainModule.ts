import { UserData } from '../../components/userProfileComponents/index.ts';
import SignupController from '../../controllers/signupController.ts';
import Block from '../../core/Block.ts';
import { ArrowButton, Image, Button } from '../../ui/index.ts';
import store from '../../core/Store.ts';

export default class ProfileMainModule extends Block{
  constructor(props:{}){
    super({
      ...props,
      NameInChat: `${store.getState().user?.display_name == null 
        ? 'Нужно придумать имя'
        : store.getState().user?.display_name}` ,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => window.router.go('/chat'),
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'40px',
        contSize:'__128still',
        imgSrc: `https://ya-praktikum.tech/api/v2/resources${store.getState().user?.avatar}`,
      }),
      ProfileInfo: new UserData({
        ...props,
      }),
      ChangeInfoButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить данные',
        onClick: () => window.router.go('/profile-change-data'),
      }),
      ChangePasswordButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить пароль',
        onClick: () => window.router.go('/profile-change-password'),
      }),
      ExitButton: new Button({
        ...props,
        type: 'link--profileError',
        label:'Выйти',
        onClick: () => SignupController.logoutUser(),
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
