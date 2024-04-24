import Block from '../../core/Block.ts';

interface ButtonInterface{
  onClick?: () => void;
  label?: string,
  type?: string
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
            <button class="button button__{{type}}" >
                {{label}}
            </button>
    
        `;
  }
}

export default Button;
