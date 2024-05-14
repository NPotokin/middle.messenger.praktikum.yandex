import Block from '../../../../core/Block.ts';


export default class AreaContentComponent extends Block{
  constructor(props:{}){
    super({
      ...props,

    });
  }

  
  render(){
    return(`
          <div class="chatAreaContent__{{modifier}}">
          <div class='{{class}}'>
              <div class="chatAreaContent__{{modifier}}--message">
                {{text}}
              </div>
              <div class="chatAreaContent__{{modifier}}--date">{{date}}</div>
          </div>
          </div>
        `);
  }
}


//На всякий случай
// <div class="chatAreaContent">
// <div class="chatAreaContent__date">19 июня</div>
//   <div class="chatAreaContent__inbound">
//       <div class="chatAreaContent__inbound--message">
//       Входящее сообщение
//       </div>
//       <div class="chatAreaContent__inbound--date">11:56</div>
//   </div>
// <div class="chatAreaContent__inbound--image">
//     <div class="chatAreaContent__inbound--message">
//         <img src="/images/image.png" alt="">
//     </div>
//     <div class="chatAreaContent__inbound--date">11:56</div>
// </div>
// <div class="chatAreaContent__outbound">
//     <div class="chatAreaContent__outbound--message">Круто!</div>
//     <div class="chatAreaContent__outbound--date">12:00</div>
// </div>
// </div>
