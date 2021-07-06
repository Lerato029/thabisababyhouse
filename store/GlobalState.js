//importing react hooks
import { createContext, useReducer, useEffect } from "react";
import reducers from "./Reducers";
import { getData } from "../utils/fetchData";

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const initialState = {
    notify: {},
    auth: {},
    cart: [],
    modal: [],
    orders: [],
    enlistApps: [],
    users: [],
    categories: [],
  };
  const [state, dispatch] = useReducer(reducers, initialState);
  const { cart, auth } = state;

  useEffect(() => {

    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      getData("auth/accessToken").then((res) => {
        if (res.err) return localStorage.removeItem("firstLogin");
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });
      getData("categories").then((res) => {
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: {
              error: res.err,
            },
          });
        dispatch({
          type: "ADD_CATEGORIES",
          payload: res.categories,
        });
      });
    }
  }, []);

  useEffect(() => {
    const thabisa_cart01 = JSON.parse(localStorage.getItem("thabisa_cart01"));
    if (thabisa_cart01) dispatch({ type: "ADD_CART", payload: thabisa_cart01 });
  }, []);

  //store cart to local storage every time cart changes
  useEffect(() => {
    localStorage.setItem("thabisa_cart01", JSON.stringify(cart));
  }, [cart]);

  //when token changes
  useEffect(() => {
    if (auth.token) {
      getData("order", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });
      getData("enlist", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
        console.log(res)
        dispatch({ type: "ADD_ENLIST_APPS", payload: res.ap });
      });
      if (auth.user.role === "admin") {
        //add users to GlobalState every time token changes+
        getData("user", auth.token).then((res) => {
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });
          dispatch({ type: "ADD_USERS", payload: res.users });
        });
      }
    } else {
      //if checks above not met then returns empty orders and users array to state
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "ADD_USERS", payload: [] });
    }
  }, [auth.token]);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
