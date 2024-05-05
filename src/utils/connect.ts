
import { StoreEvents, AppState } from "../core/Store.ts";
import isEqual from "./isEqual.ts";
import store from "../core/Store.ts";
import Block from "../core/Block.ts";

function connect(mapStateToProps: (state: AppState) => AppState) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props: {}) {
                // сохраняем начальное состояние
                let state = mapStateToProps(store.getState());

          super({...props, ...state});

          // подписываемся на событие
            store.on(StoreEvents.Updated, () => {
                    // при обновлении получаем новое состояние
                    const newState = mapStateToProps(store.getState());
              
                    // если что-то из используемых данных поменялось, обновляем компонент
                    if (!isEqual(state, newState)) {
                  this.setProps({...newState});
                    }

                    // не забываем сохранить новое состояние
                    state = newState;
            });
        }
    }
  }
}

export default connect
