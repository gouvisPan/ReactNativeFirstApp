import * as React from "react";
import { View, Text } from "react-native";
import { store } from "./store/reducers/index";
import { Provider } from "react-redux";
import Navigation from "./Navigation";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
