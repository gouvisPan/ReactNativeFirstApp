import * as React from "react";
import { View, Text } from "react-native";
import { store } from "./store/reducers/index";
import { Provider } from "react-redux";
import Navigation from "./Navigation";
import { useAppDispatch, useAppSelector } from "./hooks/hooks";
import { logoutUser } from "./store/actions/auth-actions";

function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
