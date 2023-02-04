import Slot from "./components/Slot";
import { Provider } from "react-redux";
import store from "./redux/store";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

let persistor = persistStore(store);
function App() {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Slot />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
