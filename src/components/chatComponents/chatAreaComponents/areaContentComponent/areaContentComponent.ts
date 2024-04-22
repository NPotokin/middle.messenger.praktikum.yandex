import Block from '../../../../core/Block';


export default class AreaContentComponent extends Block{
  constructor(props){
    super({
      ...props,

    });
  }
  render(){
    return(`
        <div class="chatAreaContent">
        <div class="chatAreaContent__date">19 июня</div>
        
        <div class="chatAreaContent__inbound">
            <div class="chatAreaContent__inbound--message">Привет! Смотри, 
                тут всплыл интересный кусок лунной космической истории — НАСА в
                 какой-то момент попросила Хассельблад адаптировать модель SWC 
                 для полетов на Луну. Сейчас мы все знаем что астронавты летали 
                 с моделью 500 EL — и к слову говоря, все тушки этих камер все еще 
                 находятся на поверхности Луны, так как астронавты с собой забрали 
                 только кассеты с пленкой.<br><br>
    
                 Хассельблад в итоге адаптировал SWC 
                 для космоса, но что-то пошло не так и на
                  ракету они так никогда и не попали. Всего их было 
                  произведено 25 штук, одну из них недавно продали 
                  на аукционе за 45000 евро.
                  
                  </div>
            <div class="chatAreaContent__inbound--date">11:56</div>
        </div>
    
        <div class="chatAreaContent__inbound--image">
            <div class="chatAreaContent__inbound--message">
                <img src="/images/image.png" alt="">
            </div>
            <div class="chatAreaContent__inbound--date">11:56</div>
        </div>  
            
        <div class="chatAreaContent__outbound">
            <div class="chatAreaContent__outbound--message">Круто!</div>
            <div class="chatAreaContent__outbound--date">12:00</div>
        </div>
    </div>
        `);
  }
}

