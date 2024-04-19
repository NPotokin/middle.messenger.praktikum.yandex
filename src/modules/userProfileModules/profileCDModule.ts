import Block from "../../core/Block";
import { ArrowButton, Image, Button } from "../../ui";
import navigate from "../utils/navigate";
import { UserInput } from "../../components/userProfileComponents/userInput";

export default class ProfileMainModule extends Block{
    constructor(props){
        super({
            ...props,
            BackButton: new ArrowButton({
                ...props,
                src: "/icons/arrow-left.svg",
                onClick: () => navigate('profilePage'),
            }),
            AvatarImage: new Image({
                ...props,
                imgSize:"40px",
                contSize:"__128", 
                imgSrc:"/icons/image.svg"
            }),
            
        })
    }

    init(){
        const onSaveChangesBind = this.onSaveChanges.bind(this)

        const EmailInput = new UserInput({
            inputId:"email",
            inputName:"email",
            label:"Почта",
            inputType:"email",
            inputValue:"pochta@yandex.ru",
            userInputContainerClass:"loginChange"
        });

        const LoginInput = new UserInput({
            inputId: "login", 
            inputName: "login", 
            label: "Логин", 
            inputType: "text", 
            inputValue: "ivanivanov"
        });

        const FirsNameInput = new UserInput({
            inputId: "first_name" ,
            inputName: "first_name", 
            label: "Имя", 
            inputType: "text", 
            inputValue: "Иван",
        });

        const SecondNameInput = new UserInput({
            inputId:"second_name" ,
            inputName:"second_name",
            label:"Фамилия",
            inputType:"text",
            inputValue:"Иванов",
        });

        const DisplayNameInput = new UserInput({
            inputId:"display_name" ,
            inputName:"display_name",
            label:"Имя в чате",
            inputType:"text",
            inputValue:"Иван",
        });

        const PhoneInput = new UserInput({
            inputId:"phone" ,
            inputName:"phone",
            label:"Телефон",
            inputType:"tel",
            inputValue:"7 (909) 967 30 30",
        });

        

        const SaveButton = new Button({
            type: "primary--password", 
            label:"Сохранить",
            onClick: onSaveChangesBind,
        })

        this.children = {
            ...this.children,
            EmailInput,
            LoginInput,
            FirsNameInput,
            SecondNameInput,
            DisplayNameInput,
            PhoneInput,
            SaveButton
          };
    }

    onSaveChanges(e){
        e.preventDefault();
    
        console.log({
          oldPass: this.props.oldPassword,
          password: this.props.newPassword,
          passwordRepeat: this.props.newPasswordRepeat,
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
                        <div class="profile_info">
                        {{{EmailInput}}}
                        {{{LoginInput}}}
                        {{{FirsNameInput}}}
                        {{{SecondNameInput}}}
                        {{{DisplayNameInput}}}
                        {{{PhoneInput}}}  
                    </div>
                        {{{SaveButton}}}
                    </div>
                </div>
            </div>
        `)
    }
}