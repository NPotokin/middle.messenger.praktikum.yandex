import Block from "../../../../core/Block";
import { AttachModal } from "./modal";

export default class AttachDiv extends Block {
    modal: AttachModal;

    constructor(props) {
        super({
            ...props,
            events: {
                click: () => this.toggleModalVisibility(), 
            },
            Modal: new AttachModal({
                ...props
            })
        });

        this.modal = this.children.Modal;
        this.props.events.click = this.toggleModalVisibility.bind(this);
    }

    toggleModalVisibility() {
        const modalElement = this.modal.getContent();
        if (modalElement.style.display === 'none' || modalElement.style.display === '') {
            this.modal.show();  
        } else {
            this.modal.hide();  
        }
    }

    render() {
        return (`
            <div class="chatAreaInput__attach">
                {{{Modal}}}
            </div>
        `);
    }
}
