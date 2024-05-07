import Block from '../../../core/Block.ts';
import {User} from '../../../core/Store.ts';
import { UserDataLine } from './index.ts';
import connect from '../../../utils/connect.ts';

interface UserDataInterface{
  user:{
    email:string,
    login:string,
    first_name:string,
    second_name:string,
    display_name?:string,
    phone:string,
  }
}
class UserData extends Block{
  constructor(props:UserDataInterface){
    super({
      ...props,
      Email: new UserDataLine({
        ...props,
        userKey:'Почта',
        userValue: props.user.email,
      }),
      Login: new UserDataLine({
        ...props,
        userKey:'Логин',
        userValue: props.user.login,
      }),
      Name: new UserDataLine({
        ...props,
        userKey:'Имя',
        userValue: props.user.first_name,
      }),
      Surname: new UserDataLine({
        ...props,
        userKey:'Фамилия',
        userValue: props.user.second_name,
      }),
      ChatName: new UserDataLine({
        ...props,
        userKey:'Имя в чате',
        userValue: props.user.display_name == null 
          ? props.user.first_name 
          : props.user.display_name,
      }),
      Phone: new UserDataLine({
        ...props,
        userKey:'Телефон',
        userValue: props.user.phone,
      }),
    });
  }

  componentDidUpdate(oldProps: {user:User}, newProps: {user:User}): boolean {
    if(oldProps === newProps){
      return false;
    }
    this.children.Email.setProps({userValue:newProps.user.email});
    this.children.Login.setProps({userValue:newProps.user.login});
    this.children.Name.setProps({userValue:newProps.user.first_name});
    this.children.Surname.setProps({userValue:newProps.user.second_name});
    this.children.ChatName.setProps({userValue:newProps.user.display_name});
    this.children.Phone.setProps({userValue:newProps.user.phone});
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
