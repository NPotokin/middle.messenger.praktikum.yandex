import { UserData } from '../../components/userProfileComponents';
import Block from '../../core/Block';
import { ArrowButton, Image, Button } from '../../ui';
import navigate from '../../utils/navigate';

export default class ProfileMainModule extends Block{
  constructor(props){
    super({
      ...props,
      BackButton: new ArrowButton({
        ...props,
        src: '/icons/arrow-left.svg',
        onClick: () => {navigate('chatPage');},
      }),
      AvatarImage: new Image({
        ...props,
        imgSize:'40px',
        contSize:'__128still',
        imgSrc:'/icons/image.svg',
      }),
      ProfileInfo: new UserData({
        ...props,
      }),
      ChangeInfoButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить данные',
        onClick: () => navigate('profilePageCD'),
      }),
      ChangePasswordButton: new Button({
        ...props,
        type: 'link--profile',
        label:'Изменить пароль',
        onClick: () => navigate('profilePageCP'),
      }),
      ExitButton: new Button({
        ...props,
        type: 'link--profileError',
        label:'Выйти',
        onClick: () => navigate('loginPage'),
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
                        <p class="profile__title">Иван</p>
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