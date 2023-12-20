import React, { Children, createContext, useContext, useReducer } from "react";
import reducer from "../Js/reducer";

export const Context = createContext();

const cartFromLocalStorage = JSON.parse(localStorage?.getItem("cart")) || [];

const totalPriceFromLocalStorage =
  JSON.parse(localStorage?.getItem("totalPrice")) || 0;

const isLoggedInFromLocalStorage =
  JSON.parse(localStorage?.getItem("isLoggedIn")) || false;

function StateProvider({ children }) {
  const initial = {
    allGames: [],
    filterdData: [],
    platform: "",
    orderType: "",
    gameTitle: "All",
    noSearchData: false,
    cart: cartFromLocalStorage,
    toogle: false,
    totalPrice: totalPriceFromLocalStorage,
    isLoggedIn: isLoggedInFromLocalStorage,
  };

  function setAllGames(data) {
    dispatch({ type: "SET_GAME_DATA", payload: data });
  }

  function search(name) {
    dispatch({ type: "SEARCH", payload: name });
  }

  function add(image, name, price) {
    dispatch({ type: "ADD_TO_CART", image: image, name: name, price: price });
  }

  function filter(data, filterType, filterName, title) {
    dispatch({
      type: "FILTER",
      payload: { data, filterType, filterName, title },
    });
  }

  function firebaseLogin() {
    dispatch({ type: "LOGIN" });
  }

  function firebaseLogout() {
    dispatch({ type: "LOGOUT" });
  }

  function toogleTrue() {
    dispatch({ type: "TOOGLE_TRUE" });
  }

  function toogleFalse() {
    dispatch({ type: "TOOGLE_FALSE" });
  }
  function increment(name) {
    dispatch({ type: "INCREMENT_CART", name: name });
  }

  function decrement(name) {
    dispatch({ type: "DECREMENT_CART", name: name });
  }

  function remove(name) {
    dispatch({ type: "REMOVE", payload: name });
  }

  function clear() {
    dispatch({ type: "CLEAR" });
  }

  // function setFilterdGames(data) {
  //   dispatch({ type: "SET_FILTERD_DATA", payload: data });
  // }

  const [state, dispatch] = useReducer(reducer, initial);
  //console.log(state);
  return (
    <Context.Provider
      value={{
        ...state,
        setAllGames,
        search,
        filter,
        toogleFalse,
        toogleTrue,
        add,
        increment,
        decrement,
        remove,
        clear,
        firebaseLogin,
        firebaseLogout,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export default StateProvider;

export const useContextGlobally = () => {
  return useContext(Context);
};
