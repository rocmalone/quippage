import { createContext } from "react";

export const LoggedInUserContext = createContext({
  user: false,
  setUser: () => {},
});
