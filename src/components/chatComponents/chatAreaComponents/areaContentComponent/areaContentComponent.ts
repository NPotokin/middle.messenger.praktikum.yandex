import Block from '../../../../core/Block.ts';


export default class AreaContentComponent extends Block{
  constructor(props:{}){
    super({
      ...props,

    });
  }


  render(): string {
    return(`
          <div class="chatAreaContent__{{modifier}}">
              <div class="chatAreaContent__{{modifier}}--name">
                {{name}}
              </div>
              <div class="chatAreaContent__{{modifier}}--message">
                {{text}}
              </div>
              <div class="chatAreaContent__{{modifier}}--date">
                {{date}}
              </div>
          </div>
        `);
  }
}



