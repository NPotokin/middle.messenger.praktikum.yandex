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
                contSize:"__128still", 
                imgSrc:"/icons/image.svg"
            }),
            
        })
    }

    init(){
        const onSaveChangesBind = this.onSaveChanges.bind(this)

        const OldPassInput = new UserInput({
            inputId: "oldPassword",
            inputName: "oldPassword",
            label: "Старый пароль",
            inputType: "password",
            inputValue: "ivan",
            userInputContainerClass: "loginChange"
        });

        const NewPassInput = new UserInput({
            inputId: "newPassword", 
            inputName: "newPassword", 
            label: "Новый пароль",
            inputType: "password", 
            inputValue: "ivanivanov"
        });

        const NewPassInputCheck = new UserInput({
            inputId: "newPasswordAgain", 
            inputName: "newPassword", 
            label: "Повторите новый пароль", 
            inputType: "password", 
            inputValue: "ivanivanov",
        });

        const SaveButton = new Button({
            type: "primary--password", 
            label:"Сохранить",
            onClick: onSaveChangesBind,
        })

        this.children = {
            ...this.children,
            OldPassInput,
            NewPassInput,
            NewPassInputCheck,
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
                            {{{OldPassInput}}}
                            {{{NewPassInput}}}
                            {{{NewPassInputCheck}}}
                        </div>
                        {{{SaveButton}}}
                    </div>
                </div>
            </div>
        `)
    }
}