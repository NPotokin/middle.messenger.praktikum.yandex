import Block from "../../core/Block";
import { Button } from "../../ui";
import {Input} from "../../ui";
import loginValidator from "./loginValidator";
import passwordValidator from "./passwordValidator";

export default class LoginModule extends Block {
    constructor(props){
        super({
            ...props,
        })
    }

    init(){
        const onChangeLoginBind = loginValidator.bind(this);
        const onChangePasswordBind = passwordValidator.bind(this);
        const loginButtonClickBind = this.onLogin.bind(this)

        const LoginInput = new Input({ 
            label: 'Логин',
            inputId: 'login',
            inputType: 'text',
            inputName: 'login',
            onBlur: onChangeLoginBind,

        });

        const PasswordInput = new Input({
            inputId: 'password',
            inputType: 'password',
            inputName: 'password',
            label: 'Пароль',
            onBlur: onChangePasswordBind,
        });
        
        const LogInButton = new Button({
            onClick: loginButtonClickBind,
            label: "Авторизоваться",
            type: 'primary'
        });

        const SignInButton = new Button({
            // click: props.onClick,
            label: "Нет аккаунта?",
            type: 'link'
        });

        this.children = {
            ...this.children,
            LoginInput,
            PasswordInput,
            LogInButton,
            SignInButton,
        }
    }

    onLogin(e){
        e.preventDefault();
       
        console.log({
            login: this.props.login,
            password: this.props.password,
        })
    }

    render(): string {
        return(`
        <div class="login">
            <div class="login__modal">
                <h1 class="login__title">Вход</h1>
                <form 
                action="{{formAction}}" 
                class="login__form">
                    {{{LoginInput}}}
                    {{{PasswordInput}}}
                    {{{LogInButton}}}
                    {{{SignInButton}}}
                </form>
            </div>
        </div>
        `)
    }
}