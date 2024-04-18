import Block from "../../core/Block";
import { ChatListModule, ChatAreaModule } from "../../modules";

export default class ChatPage extends Block{
    constructor(props){
        super({
            ...props,
            ChatList: new ChatListModule({
                ...props,
            }),
            ChatArea: new ChatAreaModule({
                ...props,
            })
        })
    }
        render(): string {
            return(`
            <div class="chat">
                <div class="chatList">{{{ChatList}}}</div>
                <div class="chatArea">{{{ChatArea}}}</div>
            </div>
            `)
        }

    }
