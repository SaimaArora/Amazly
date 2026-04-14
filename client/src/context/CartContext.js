import { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    const existing = cart.find((item) => item.id === product.id);

    if (existing) {
        setCart(
        cart.map((item) =>
            item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        );
    } else {
        setCart([...cart, { ...product, quantity: 1 }]);
    }
    };

    const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
    };

    const updateQuantity = (id, qty) => {
    setCart(
        cart.map((item) =>
        item.id === id ? { ...item, quantity: qty } : item
        )
    );
    };
    const getQuantity = (id) => {
        const item = cart.find((i) => i.id === id);
        return item ? item.quantity : 0;
    };

    const decreaseQty = (id) => {
        const item = cart.find((i) => i.id === id);

        if (item.quantity === 1) {
            removeFromCart(id);
        } else {
            updateQuantity(id, item.quantity - 1);
        }
    };

  return (
    <CartContext.Provider value={{
  cart,
  addToCart,
  removeFromCart,
  updateQuantity,
  getQuantity,
  decreaseQty
}}>
      {children}
    </CartContext.Provider>
  );

}

