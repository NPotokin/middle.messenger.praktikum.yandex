import Block from '../../../../core/Block.ts';

export default class InactiveAreaComponent extends Block{
  constructor(props:{}){
    super({
      ...props,
    });
  }

  render(): string {
    return(`
        <div class="chatAreaInactive">
            <p class="chatAreaInactive__text">Выберите чат чтобы отправить сообщение</p>
        </div>
        `);
  }
}
