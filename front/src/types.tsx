import { createContext } from "react";

interface ApiContextProps {
  apiUrl: string;
}

export const ApiContext = createContext<Partial<ApiContextProps>>({});
