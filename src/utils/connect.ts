
import { StoreEvents, AppState } from "../core/Store.ts";
import isEqual from "./isEqual.ts";
import store from "../core/Store.ts";
import Block from "../core/Block.ts";

function connect(mapStateToProps: (state: AppState) => AppState) {
  return function(Component: typeof Block) {
    return class extends Component {
      constructor(props: {}) {
          let state = mapStateToProps(store.getState());
          console.log('old:', state)
          super({...props, ...state});

            store.on(StoreEvents.Updated, () => {
                    const newState = mapStateToProps(store.getState());
                    if (!isEqual(state, newState)) {
                  this.setProps({...newState});
                  console.log('new:', newState)
                    }

                    state = newState;
            });
        }
    }
  }
}

export default connect
