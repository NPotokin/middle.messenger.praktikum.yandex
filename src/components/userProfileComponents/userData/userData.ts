import Block from '../../../core/Block.ts';
import store, {User} from '../../../core/Store.ts';
import { UserDataLine } from './index.ts';
import connect from '../../../utils/connect.ts';

class UserData extends Block{
  constructor(props:{}){
    super({
      ...props,
      Email: new UserDataLine({
        ...props,
        userKey:'Почта',
        userValue: `${store.getState().user?.email}`,
      }),
      Login: new UserDataLine({
        ...props,
        userKey:'Логин',
        userValue: `${store.getState().user?.login}`,
      }),
      Name: new UserDataLine({
        ...props,
        userKey:'Имя',
        userValue: `${store.getState().user?.first_name}`,
      }),
      Surname: new UserDataLine({
        ...props,
        userKey:'Фамилия',
        userValue:`${store.getState().user?.second_name}`,
      }),
      ChatName: new UserDataLine({
        ...props,
        userKey:'Имя в чате',
        userValue:`${store.getState().user?.display_name == null 
          ? 'to be defined' 
          : store.getState().user?.display_name}`,
      }),
      Phone: new UserDataLine({
        ...props,
        userKey:'Телефон',
        userValue:`${store.getState().user?.phone}`,
      }),
    });
  }

  componentDidUpdate(oldProps: {}, newProps: {}): boolean {
    if(oldProps === newProps){
      return false;
    }
    console.log('updating')
    this.children.Email.setProps(newProps);
    this.children.Login.setProps(newProps);
    this.children.Name.setProps(newProps);
    this.children.Surname.setProps(newProps);
    this.children.ChatName.setProps(newProps);
    this.children.Phone.setProps(newProps);
    return true;
  }

  

  render(){
    return(`
        <div>
            {{{Email}}}
            {{{Login}}}
            {{{Name}}}
            {{{Surname}}}
            {{{ChatName}}}
            {{{Phone}}}
        </div>
        `);
  }
}

function mapStateToProps(store: { user: User}) { 
  return{     
    user: store.user
  }
}

export default connect(mapStateToProps)(UserData)
