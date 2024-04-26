import Block from '../../core/Block.ts';

interface ButtonInterface{
  onClick?: (event: Event) => void;
  label?: string,
  type?: string,
  buttonType?: string,
}
class Button extends Block {
  constructor(props: ButtonInterface) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(): string {
    return `
            <button class="button button__{{type}}" type={{buttonType}} >
                {{label}}
            </button>
    
        `;
  }
}

export default Button;
