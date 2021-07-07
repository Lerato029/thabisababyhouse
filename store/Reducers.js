//actions to identify changes to global state
import { ACTIONS } from "./Actions";

//function for determining changes made to global state variables
const reducers = (state, action) => {
  //check which action is used and update state property
  switch (action.type) {
    case ACTIONS.NOTIFY:
      return {
        ...state,
        notify: action.payload,
      };
    case ACTIONS.AUTH:
      return {
        ...state,
        auth: action.payload,
      };
    case ACTIONS.ADD_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ACTIONS.ADD_MODAL:
      return {
        ...state,
        modal: action.payload,
      };
    case ACTIONS.ADD_ORDERS:
      return {
        ...state,
        orders: action.payload,
      };
    case ACTIONS.ADD_USERS:
      return {
        ...state,
        users: action.payload,
      };
    case ACTIONS.ADD_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case ACTIONS.ADD_ENLIST_APPS:
      return {
        ...state,
        enlistApps: action.payload,
      };
    default:

      //no actions identified
      return state;
  }
};


//export module
export default reducers;
