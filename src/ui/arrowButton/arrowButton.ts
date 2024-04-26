import Block from '../../core/Block.ts';

interface ArrowBtnInterface {
  onClick?: (event: Event) => void;
  alt?: string,
  src?: string,

}

export default class ArrowButton extends Block{
  constructor(props: ArrowBtnInterface){
    super({
      ...props,
      events:{
        click: props.onClick,
      },
    });
  }

  render(){
    return(`
        <button class="arrowButton">
        <img src="{{src}}" 
             alt="{{alt}}" 
             class="arrowButton__image">
         </button>
        `);
  }
}
