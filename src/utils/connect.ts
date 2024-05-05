//@ts-nocheck
import { StoreEvents } from "../core/Store.ts";
import isEqual from "./isEqual.ts";
import store from "../core/Store.ts";

export function connect(mapStateToProps, dispatch?) {
  return function(Component) {
    return class extends Component{
      private onChangeStoreCallback: () => void;
      constructor(props) {
        // сохраняем начальное состояние
        let state = mapStateToProps(store.getState());

        super({...props, ...state});

        const dispatchHandler = {};
        Object.entries(dispatch || {}).forEach(([key, handler]) => {
          dispatchHandler[key] = (...args) => handler(window.store.set.bind(window.store), ...args)
        })

        this.setProps({...dispatchHandler});

        this.onChangeStoreCallback = () => {

          // при обновлении получаем новое состояние
          const newState = mapStateToProps(store.getState());

          // если что-то из используемых данных поменялось, обновляем компонент
          if (!isEqual(state, newState)) {
            this.setProps({...newState});
          }

          // не забываем сохранить новое состояние
          state = newState;
        }

        // подписываемся на событие
        store.on(StoreEvents.Updated, this.onChangeStoreCallback);
      }


    componentWillUnmount() {
      super.componentWillUnmount();
      window.store.off(StoreEvents.Updated, this.onChangeStoreCallback);
    }
  }
}
}