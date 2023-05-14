import React, { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  totalPrice: 0,
  isCartShown: false,
  toggleCartShown: () => {},
});

const defaultCartState = {
  items: [],
  totalPrice: 0,
  isCartShown: false,
};

const ACTIONS = {
  ADD_ITEM: "addItem",
  REMOVE_ITEM: "removeItem",
  TOGGLE_CART: "toggleCart",
};

const cartReducer = (state, action) => {
  const { items } = state;

  if (action.type === ACTIONS.ADD_ITEM) {
    const existingItem = items.findIndex((item) => item.id === action.item.id);

    let updatedState = state;
    if (existingItem === -1) {
      const updatedItems = [...items, action.item];
      updatedState = {
        ...state,
        items: updatedItems,
        totalPrice:
          Number.parseInt(action.item.price) +
          Number.parseInt(state.totalPrice),
      };
    } else {
      updatedState = state;
      window.alert("Already added into the cart");
    }

    return updatedState;
  } else if (action.type === ACTIONS.REMOVE_ITEM) {
    const itemToRemoveIndx = items.findIndex((item) => +item.id === +action.id);
    const updatedState = {
      ...state,
      items: [
        ...state.items.slice(0, itemToRemoveIndx),
        ...state.items.slice(itemToRemoveIndx + 1),
      ],
      totalPrice:
        Number.parseInt(state.totalPrice) -
        Number.parseInt(state.items[itemToRemoveIndx].price),
    };

    return updatedState;
  } else if (action.type === ACTIONS.TOGGLE_CART) {
    const updatedState = { ...state, isCartShown: !state.isCartShown };
    return updatedState;
  }

  return state;
};

const CartContextProvider = ({ children }) => {
  const [cartState, cartActionDispatch] = useReducer(
    cartReducer,
    defaultCartState
  );

  const addItemDispatch = (item) => {
    cartActionDispatch({ type: ACTIONS.ADD_ITEM, item: item });
  };

  const removeItemDispatch = (id) => {
    cartActionDispatch({ type: ACTIONS.REMOVE_ITEM, id: id });
  };

  const toggleCart = () => {
    cartActionDispatch({ type: ACTIONS.TOGGLE_CART });
  };

  const cartContextValue = {
    items: cartState.items,
    addItem: (item) => {
      addItemDispatch(item);
    },
    removeItem: (id) => {
      removeItemDispatch(id);
    },
    totalPrice: cartState.totalPrice,
    isCartShown: cartState.isCartShown,
    toggleCartShown: toggleCart,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
