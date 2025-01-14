import { create } from "zustand";
import { Item } from "@/app/(components)/ProductList";
import { persist, createJSONStorage } from "zustand/middleware";
import { toast } from "react-hot-toast";

interface CartItem extends Item {
  quantity: number; // Add quantity field
}

interface CartStore {
  items: CartItem[];
  addItem: (data: Item, quantity?: number) => void;
  updateItemQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  removeAll: () => void;
}

const useCart = create(
  persist<CartStore>(
    (set, get) => ({
      items: [],
      addItem: (data: Item, quantity = 1) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === data.id);

        if (existingItemIndex >= 0) {
          // Item already in cart, update its quantity
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity += quantity;
          set({ items: updatedItems });
          toast.success(`Increased quantity of ${data.name} to ${updatedItems[existingItemIndex].quantity}.`);
        } else {
          // Add new item with initial quantity
          set({ items: [...currentItems, { ...data, quantity }] });
          toast.success(`${data.name} added to cart.`);
        }
      },
      updateItemQuantity: (id: string, quantity: number) => {
        const currentItems = get().items;
        const existingItemIndex = currentItems.findIndex((item) => item.id === id);

        if (existingItemIndex >= 0) {
          const updatedItems = [...currentItems];
          updatedItems[existingItemIndex].quantity = quantity;
          set({ items: updatedItems });
          toast.success(`Updated quantity of ${updatedItems[existingItemIndex].name} to ${quantity}.`);
        } else {
          toast.error("Item not found in cart.");
        }
      },
      removeItem: (id: string) => {
        const currentItems = get().items;
        const updatedItems = currentItems.filter((item) => item.id !== id);
        set({ items: updatedItems });
        toast.success("Item removed from cart.");
      },
      removeAll: () => {
        set({ items: [] });
        toast.success("Cart cleared.");
      },
    }),
    {
      name: "cart-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export const selectCartIsEmpty = (state: CartStore) => state.items.length === 0;

export default useCart;
