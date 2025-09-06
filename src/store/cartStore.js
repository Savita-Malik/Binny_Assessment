import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  addToCart: (product) =>
    set((state) => {
      const exists = state.cart.find((p) => p.id === product.id);
      if (exists) {
        // if product exists, increase quantity
        return {
          cart: state.cart.map((p) =>
            p.id === product.id ? { ...p, qty: p.qty + 1 } : p
          ),
        };
      }
      return { cart: [...state.cart, { ...product, qty: 1 }] };
    }),
  removeFromCart: (id) =>
    set((state) => ({
      cart: state.cart.filter((p) => p.id !== id),
    })),
  clearCart: () => set({ cart: [] }),
}));
