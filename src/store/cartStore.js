// store/cartStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, variant, quantity = 1) => {
        const cart = get().cart;

        const existing = cart.find(
          (item) =>
            item.productId === product._id && item.variantId === variant._id // ✅ different variant = different entity
        );

        if (existing) {
          // Increase quantity
          const updatedCart = cart.map((item) =>
            item.productId === product._id && item.variantId === variant._id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          set({ cart: updatedCart });
        } else {
          // New item
          set({
            cart: [
              ...cart,
              {
                productId: product._id,
                name: product.name,
                variantId: variant._id,
                variantName: variant.name,
                image: variant.image || product.images?.[0],
                price: variant.discountedPrice || variant.actualPrice,
                quantity,
              },
            ],
          });
        }
      },

      removeFromCart: (productId, variantId) => {
        set({
          cart: get().cart.filter(
            (item) =>
              item.productId !== productId || item.variantId !== variantId
          ),
        });
      },

      updateQuantity: (productId, variantId, quantity) => {
        const cart = get().cart;
        const updatedCart = cart.map((item) =>
          item.productId === productId && item.variantId === variantId
            ? { ...item, quantity: Math.max(quantity, 1) }
            : item
        );
        set({ cart: updatedCart });
      },

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // localStorage key
    }
  )
);
