import Block from '../../../../core/Block.ts';
import AreaInputForm from './areaInputForm.ts';
import AttachDiv from './attachDiv.ts';


export default class AreaInputComponent extends Block{
  constructor(props :{}){
    super({
      ...props,
      AttachDiv: new AttachDiv({
        ...props,
      }),
      AreaInputForm: new AreaInputForm({...props}),

    });


  }

  render(){
    return(`
    <div class="chatAreaInput">
      {{{AttachDiv}}}
      {{{AreaInputForm}}}
    </div>
    `);
  }
}
