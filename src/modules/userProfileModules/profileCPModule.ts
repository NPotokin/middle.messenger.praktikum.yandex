import Block from "../../core/Block";
import { ArrowButton, Image, Button } from "../../ui";
import navigate from "../utils/navigate";
import { UserInput } from "../../components/userProfileComponents/userInput";
import passwordValidator from "../utils/inputValidators/passwordValidator";
import { passwordCheckValidator } from "../utils/inputValidators/passwordCheckValidator";
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
        const passwordValidatorBind = passwordValidator.bind(this)
        const passwordCheckValidatorBind = passwordCheckValidator.bind(this)


        const OldPassInput = new UserInput({
            inputId: "oldPassword",
            inputName: "oldPassword",
            label: "Старый пароль",
            inputType: "password",
            inputValue: "ivan",
            userInputContainerClass: "loginChange",
            onBlur: passwordValidatorBind,
        });

        const PasswordInput = new UserInput({
            inputId: "newPassword", 
            inputName: "newPassword", 
            label: "Новый пароль",
            inputType: "password", 
            inputValue: "ivanivanov",
            onBlur: passwordValidatorBind,
        });

        const PasswordCheckInput = new UserInput({
            inputId: "newPasswordAgain", 
            inputName: "newPassword", 
            label: "Повторите новый пароль", 
            inputType: "password", 
            inputValue: "ivanivanov",
            onBlur: passwordCheckValidatorBind,
        });

        const SaveButton = new Button({
            type: "primary--password", 
            label:"Сохранить",
            onClick: onSaveChangesBind,
        })

        this.children = {
            ...this.children,
            OldPassInput,
            PasswordInput,
            PasswordCheckInput,
            SaveButton
          };
    }

    onSaveChanges(e){
        e.preventDefault();
        console.log({
        //   oldPass: this.props.oldPassword,
          password: this.props.password,
        //   passwordRepeat: this.props.newPasswordRepeat,
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
                            {{{PasswordInput}}}
                            {{{PasswordCheckInput}}}
                        </div>
                        {{{SaveButton}}}
                    </div>
                </div>
            </div>
        `)
    }
}