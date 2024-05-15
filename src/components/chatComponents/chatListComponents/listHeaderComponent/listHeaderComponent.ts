import Block from '../../../../core/Block.ts';
import { Button } from '../../../../ui/index.ts';
import ListHeaderLink from './listHeaderLink.ts';
import ListHeaderForm from './listHeaderForm.ts';
import NewChatModal from './newChatModal.ts';

interface ListHeaderComponentInterface{
  inputId?: string,
  inputName?: string,

}
export default class ListHeaderComponent extends Block{
  private isModalVisible: boolean = false;
  constructor(props:ListHeaderComponentInterface){
    super({
      ...props,
      ListHeaderLink: new ListHeaderLink({
        ...props,
        onClick: () => window.router.go('/settings'),
      }),
      ListHeaderForm: new ListHeaderForm({...props}),
      NewChatButton: new Button({
        ...props,
        type: 'primary',
        buttonType: 'button',
        label: 'Новый чат',
        onClick: () => this.toggleChangeModalVisibility(),
      }),
      NewChatModal: new NewChatModal({...props}),
    });
  }

  toggleChangeModalVisibility() {
    console.log('toggle modal');
    const modalComponent = this.children.NewChatModal;
    if (modalComponent) {
      const modalElement = modalComponent.getContent();
      if (modalElement) {
        this.isModalVisible = !this.isModalVisible;
        modalElement.style.display = this.isModalVisible ? 'flex' : 'none';
      }
    }
  }

  render(){
    return(`
        <div class="listHeader">
          {{{ListHeaderLink}}}
          {{{NewChatButton}}}
          {{{ListHeaderForm}}}
          {{{NewChatModal}}}
        </div>
    
        `);
  }
}
