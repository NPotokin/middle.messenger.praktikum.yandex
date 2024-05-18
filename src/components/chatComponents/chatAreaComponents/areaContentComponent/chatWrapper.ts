import Block from '../../../../core/Block.ts';


export default class ChatWrapper extends Block {
  constructor(props: {}) {
    super({
      ...props,
    });
  }

  render(): string {
    return (`
        <div class="chatAreaContent">
            {{{messages}}}
        </div>
        `);
  }
}


