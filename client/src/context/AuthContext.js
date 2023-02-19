import { createContext, useEffect, useReducer } from "react";
import ReducerContext from "./ReducerContext";
const initialState = {
  user: null || JSON.parse(localStorage.getItem("user")),
  isFetching: false,
  error: false,
  darkmode: false || JSON.parse(localStorage.getItem("darkmode")),
};
export const CreateContext = createContext(initialState);

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ReducerContext, initialState);
  useEffect(() => { 
    localStorage.setItem("user", JSON.stringify(state.user));
    localStorage.setItem("darkmode", state.darkmode);
  }, [state.user,state.darkmode]);
  return (
    <CreateContext.Provider
      value={{
        user: state?.user,
        isFetching: state.isFetching,
        error: state.error, 
        darkmode: state.darkmode,
        dispatch,
      }} 
    >
      {children}
    </CreateContext.Provider>
  );
};
