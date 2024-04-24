import Block, {ComponentInterface} from '../../../../core/Block.ts';
import { AttachModal } from './modal/index.ts';


export default class AttachDiv extends Block {
  modal: AttachModal;

  constructor(props:ComponentInterface) {
    super({
      ...props,
      events: {
        click: () => this.toggleModalVisibility(),
      },
      Modal: new AttachModal({
        ...props,
      }),
    });

    this.modal = this.children.Modal as AttachModal;
    if (this.props.events) {
      const clickHandler = this.props.events['click'];
      if (clickHandler) {
        this.props.events.click = clickHandler.bind(this);
      }
    }
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
