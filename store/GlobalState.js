/* ============================================DataProvider Component======================================= */
//importing react hooks
import { createContext, useReducer, useEffect } from "react";

//reducer function
import reducers from "./Reducers";

//GET request to REST API
import { getData } from "../utils/fetchData";

//creating data context for all components in app
export const DataContext = createContext();

//pass all pages in component
export const DataProvider = ({ children }) => {
  //state object default values
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

  //initialize state and dispatch to update it
  const [state, dispatch] = useReducer(reducers, initialState);

  //destructuring properties to be used
  const { cart, auth } = state;

  /* ========================================================Main Functionality */
  /*READ - When app opened append auth and categories to state*/
  useEffect(() => {
    //check if user has logged in - boolean stored in LS
    const firstLogin = localStorage.getItem("firstLogin");

    //if true and in LS...
    if (firstLogin) {
      /*GET data for auth state property*/
      getData("auth/accessToken").then((res) => {

        //if error remove local storage key 
        if (res.err) return localStorage.removeItem("firstLogin");

        //access token successfully generated and append to auth
        dispatch({
          type: "AUTH",
          payload: {
            token: res.access_token,
            user: res.user,
          },
        });
      });

      /*GET data for categories*/
      getData("categories").then((res) => {
        //check is response gives error
        if (res.err)
          return dispatch({
            type: "NOTIFY",
            payload: {
              error: res.err,
            },
          });

        //else append categories to state
        dispatch({
          type: "ADD_CATEGORIES",
          payload: res.categories,
        });
      });
    }
  }, []);

  /*READ - When app opened retrieve cart form LS + append to state*/
  useEffect(() => {
    const thabisa_cart01 = JSON.parse(localStorage.getItem("thabisa_cart01"));
    if (thabisa_cart01) dispatch({ type: "ADD_CART", payload: thabisa_cart01 });
  }, []);

  //store cart to local storage every time cart changes
  useEffect(() => {
    localStorage.setItem("thabisa_cart01", JSON.stringify(cart));
  }, [cart]);

  //READ - when token changes and web app opened...
  useEffect(() => {
    //check if user is logged in
    if (auth.token) {
      //=================================GET Orders
      getData("order", auth.token).then((res) => {
        //check if error is returned
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });

        //else append orders to state property
        dispatch({ type: "ADD_ORDERS", payload: res.orders });
      });

      //====================GET Enlist Applications
      getData("enlist", auth.token).then((res) => {
        if (res.err)
          return dispatch({ type: "NOTIFY", payload: { error: res.err } });
  
        dispatch({ type: "ADD_ENLIST_APPS", payload: res.ap });
      });

      //========================GET Users for Admin
      if (auth.user.role === "admin") {
        
        getData("user", auth.token).then((res) => {
          //check err returned
          if (res.err)
            return dispatch({ type: "NOTIFY", payload: { error: res.err } });

          //no err so append to users state property
          dispatch({ type: "ADD_USERS", payload: res.users });
        });
      }
    } else {
      //if checks above not met then returns empty orders and users array to state
      dispatch({ type: "ADD_ORDERS", payload: [] });
      dispatch({ type: "ADD_USERS", payload: [] });
    }
  }, [auth.token]);

  /* return context for entire app*/
  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
