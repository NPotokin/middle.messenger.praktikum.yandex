import Block from '../../../../../core/Block.ts';

export default class AttachModal extends Block{
  constructor(props:{}){
    super({
      ...props,
    });
  }


  render(){
    return(`
        <div class="modalAttach">
            <div class="modalAttach__attachment">
                <img 
                class="modalAttach__attachment--icon"
                src="/icons/attachMedia.svg"></img>
                <p class="modalAttach__text">Фото или Видео</p>
            </div>
            <div class="modalAttach__attachment">
                <img 
                class="modalAttach__attachment--icon"
                src="/icons/attachFile.svg"></img>
                <p class="modalAttach__text">Файл</p>
            </div>
            <div class="modalAttach__attachment">
                <img 
                class="modalAttach__attachment--icon"
                src="/icons/attachLocation.svg"></img>
                <p class="modalAttach__text">Локация</p>
            </div>
        </div>
        `);
  }
}
