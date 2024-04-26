import Block from '../../../core/Block.ts';

interface UDLinterface{
  userKey?: string,
  userValue?: string,
}
export default class UserDateLine extends Block{
  constructor(props: UDLinterface){
    super({
      ...props,
    });
  }

  render(){
    return(`
        <div class="userData">
            <p class="userData__key">{{userKey}}</p>
            <p class="userData__value">{{userValue}}</p>
        </div>
        `);
  }
}
