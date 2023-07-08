import { createContext } from "react";

export const defaultUser = {
  id: "",
  username: "",
  email: "",
  password: "",
};

const userContext = createContext(defaultUser);

export default userContext;
