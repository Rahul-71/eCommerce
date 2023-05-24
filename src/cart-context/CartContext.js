import React, { useContext, useEffect, useState } from "react";
import { fetchCartItems, updateCart } from "../Utils/UtilityFunctions";
import { AuthContext } from "./AuthContext";

export const CartContext = React.createContext({
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  totalPrice: 0,
  isCartShown: false,
  toggleCartShown: () => {},
});

const defCartState = {
  items: [],
  totalPrice: 0,
  isCartShown: false,
};

const CartContextProvider = ({ children }) => {
  const authCtx = useContext(AuthContext);
  const { emailId, isLoggedIn } = authCtx;

  const [cartState, setCartState] = useState(defCartState);

  useEffect(() => {
    const fetchInitialState = async () => {
      try {
        const response = await fetchCartItems(emailId);
        setCartState((prevState) => ({ ...prevState, ...response }));
      } catch (error) {
        console.log(
          `Error occurred while fetching cart items: ${error.message}`
        );
      }
    };

    isLoggedIn ? fetchInitialState() : setCartState(defCartState);
  }, [isLoggedIn, emailId]);

  const addItem = (item) => {
    setCartState((prevState) => {
      const existingItem = prevState.items.find(
        (prevItem) => prevItem.id === item.id
      );

      if (existingItem) {
        window.alert("Already added into the cart");
        return prevState;
      }

      const updatedItems = [...prevState.items, item];
      const totalPrice =
        Number.parseInt(item.price) + Number.parseInt(prevState.totalPrice);

      updateCart({ items: updatedItems, totalPrice }, emailId)
        .then(() => {})
        .catch((err) => console.log(`Error occurred: ${err}`));

      return { ...prevState, items: updatedItems, totalPrice };
    });
  };

  const removeItem = (id) => {
    setCartState((prevState) => {
      const itemToRemoveIndex = prevState.items.findIndex(
        (item) => +item.id === +id
      );
      const updatedItems = [
        ...prevState.items.slice(0, itemToRemoveIndex),
        ...prevState.items.slice(itemToRemoveIndex + 1),
      ];
      const totalPrice =
        Number.parseInt(prevState.totalPrice) -
        Number.parseInt(prevState.items[itemToRemoveIndex].price);

      updateCart({ items: updatedItems, totalPrice }, emailId)
        .then(() => {})
        .catch((err) => console.log(`Error occurred: ${err}`));

      return { ...prevState, items: updatedItems, totalPrice };
    });
  };

  const toggleCartShown = () => {
    setCartState((prevState) => ({
      ...prevState,
      isCartShown: !prevState.isCartShown,
    }));
  };

  const cartContextValue = {
    items: cartState.items,
    addItem,
    removeItem,
    totalPrice: cartState.totalPrice,
    isCartShown: cartState.isCartShown,
    toggleCartShown,
  };

  return (
    <CartContext.Provider value={cartContextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;

/////////////////////// using useReducer ///////////////////////

// import React, { useContext, useEffect, useReducer } from "react";
// import { fetchCartItems, updateCart } from "../Utils/UtilityFunctions";
// import { AuthContext } from "./AuthContext";

// export const CartContext = React.createContext({
//   items: [],
//   addItem: (item) => {},
//   removeItem: (id) => {},
//   totalPrice: 0,
//   isCartShown: false,
//   toggleCartShown: () => {},
// });

// const defCartState = {
//   items: [],
//   totalPrice: 0,
//   isCartShown: false,
// };

// const ACTIONS = {
//   ADD_ITEM: "addItem",
//   REMOVE_ITEM: "removeItem",
//   TOGGLE_CART: "toggleCart",
//   SET_INITIAL_STATE: "setInitialState",
// };

// const cartReducer = (state, action) => {
//   const { items } = state;

//   switch (action.type) {
//     case ACTIONS.ADD_ITEM:
//       const existingItem = items.find((item) => item.id === action.item.id);

//       if (existingItem) {
//         window.alert("Already added into the cart");
//         return state;
//       }

//       const updatedItems = [...items, action.item];
//       const totalPrice =
//         Number.parseInt(action.item.price) + Number.parseInt(state.totalPrice);

//       updateCart({ items: updatedItems, totalPrice }, action.emailId)
//         .then((res) => {})
//         .catch((err) => {});

//       return { ...state, items: updatedItems, totalPrice };

//     case ACTIONS.REMOVE_ITEM:
//       const itemToRemoveIndx = items.findIndex(
//         (item) => +item.id === +action.id
//       );

//       const updatedState = {
//         ...state,
//         items: [
//           ...state.items.slice(0, itemToRemoveIndx),
//           ...state.items.slice(itemToRemoveIndx + 1),
//         ],
//         totalPrice:
//           Number.parseInt(state.totalPrice) -
//           Number.parseInt(state.items[itemToRemoveIndx].price),
//       };

//       updateCart(updatedState, action.emailId)
//         .then((res) => {})
//         .catch((err) => {});

//       return updatedState;

//     case ACTIONS.TOGGLE_CART:
//       return { ...state, isCartShown: !state.isCartShown };

//     case ACTIONS.SET_INITIAL_STATE:
//       return { ...state, ...action.payload };

//     default:
//       return state;
//   }
// };

// const CartContextProvider = ({ children }) => {
//   const authCtx = useContext(AuthContext);

//   const [cartState, cartActionDispatch] = useReducer(cartReducer, defCartState);

//   useEffect(() => {
//     const fetchInitialState = async () => {
//       try {
//         // Use destructuring to get the emailId from authCtx
//         const { emailId } = authCtx;
//         // Use await and then to get the response and dispatch the action
//         await fetchCartItems(emailId).then((response) =>
//           cartActionDispatch({
//             type: ACTIONS.SET_INITIAL_STATE,
//             payload: response,
//           })
//         );
//       } catch (error) {
//         console.log(
//           `error occured while fetching cart items : ${error.message}`
//         );
//       }
//     };

//     // Use a ternary operator to simplify the conditional logic
//     authCtx.isLoggedIn
//       ? fetchInitialState()
//       : cartActionDispatch({
//           type: ACTIONS.SET_INITIAL_STATE,
//           payload: defCartState,
//         });
//   }, [authCtx.isLoggedIn]);

//   const addItemDispatch = (item) => {
//     cartActionDispatch({
//       type: ACTIONS.ADD_ITEM,
//       item: item,
//       emailId: authCtx.emailId,
//     });
//   };

//   const removeItemDispatch = (id) => {
//     cartActionDispatch({
//       type: ACTIONS.REMOVE_ITEM,
//       id: id,
//       emailId: authCtx.emailId,
//     });
//   };

//   const toggleCart = () => {
//     cartActionDispatch({ type: ACTIONS.TOGGLE_CART });
//   };

//   const cartContextValue = {
//     items: cartState.items,
//     addItem: (item) => {
//       addItemDispatch(item);
//     },
//     removeItem: (id) => {
//       removeItemDispatch(id);
//     },
//     totalPrice: cartState.totalPrice,
//     isCartShown: cartState.isCartShown,
//     toggleCartShown: toggleCart,
//   };

//   return (
//     <CartContext.Provider value={cartContextValue}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export default CartContextProvider;
