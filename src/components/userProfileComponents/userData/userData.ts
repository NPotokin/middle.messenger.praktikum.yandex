import Block from "../../../core/Block";
import { UserDataLine } from ".";

export default class UserData extends Block{
    constructor(props){
        super({
            ...props,
            Email: new UserDataLine({
                ...props,
                userKey:"Почта",
                userValue:"pochta@yandex.ru",
            }),
            Login: new UserDataLine({
                ...props,
                userKey:"Логин",
                userValue:"ivanivanov",
            }),
            Name: new UserDataLine({
                ...props,
                userKey:"Имя",
                userValue:"Иван",
            }),
            Surname: new UserDataLine({
                ...props,
                userKey:"Фамилия",
                userValue:"Иванов",
            }),
            ChatName: new UserDataLine({
                ...props,
                userKey:"Имя в чате",
                userValue:"Иван",
            }),
            Phone: new UserDataLine({
                ...props,
                userKey:"Телефон",
                userValue:"+7 (909) 967 30 30",
            }),
        })
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
        `)
    }
}