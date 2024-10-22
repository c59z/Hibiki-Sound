import React from "react";
import AuthenticationStore from "./authentication.Store";

class RootStore {
  constructor() {
    this.authenticationStore = new AuthenticationStore();
  }
}

const rootStore = new RootStore();
const context = React.createContext(rootStore);

const useStore = () => React.useContext(context);

export { useStore };
