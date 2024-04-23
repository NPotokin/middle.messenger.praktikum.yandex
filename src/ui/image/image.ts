import Block from '../../core/Block.ts';

interface ImageInterface {
  onClick: () => void;
}
export default class Image extends Block{
  constructor(props: ImageInterface){
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }

  render(){
    return(`
            <div class="imageContainer{{contSize}}">
                <img 
                class="image"
                src="{{imgSrc}}" 
                alt="{{imgAlt}}" 
                width="{{imgSize}}" 
                height="{{imgSize}}"
                >
            </div>
        `);
  }
}
