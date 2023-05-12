import React, { useReducer } from "react";

export const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  totalPrice: 0,
});

const defaultCartState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  const { items } = state;

  if (action.type === "ADD") {
    const existingItem = items.findIndex((item) => item.id === action.item.id);

    let updatedState = null;
    if (existingItem === -1) {
      updatedState = [...items, action.item];
      updatedState = {
        items: updatedState,
        totalPrice:
          Number.parseInt(action.item.price) +
          Number.parseInt(state.totalPrice),
      };
    } else {
      updatedState = state;
      window.alert("Already added into the cart");
    }

    return updatedState;
  }
  if (action.type === "REMOVE") {
    const itemToRemoveIndx = items.findIndex((item) => +item.id === +action.id);
    const updatedState = {
      items: [
        ...state.items.slice(0, itemToRemoveIndx),
        ...state.items.slice(itemToRemoveIndx + 1),
      ],
      totalPrice:
        Number.parseInt(state.totalPrice) -
        Number.parseInt(state.items[itemToRemoveIndx].price),
    };

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
    cartActionDispatch({ type: "ADD", item: item });
  };

  const removeItemDispatch = (id) => {
    cartActionDispatch({ type: "REMOVE", id: id });
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
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
