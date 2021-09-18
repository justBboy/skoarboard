import React from "react";
import Routes from "./src/Routes";
import { StoreProvider } from "./src/store/store";
import reducer, {initialState} from "./src/store/reducers";

const App = () => {
  return (
      <StoreProvider initialState={initialState} reducer={reducer}>
        <Routes />
      </StoreProvider>
    )
}

export default App
