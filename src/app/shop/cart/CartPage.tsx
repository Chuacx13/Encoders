'use client';

import React from 'react';
import Link from 'next/link';
import CartItem from '../../(components)/ui/CartItem';
import useCart from '@/hooks/use-cart';

const Cart: React.FC = () => {
  const { items, addItem, removeItem, updateItemQuantity } = useCart();

  const cartIsEmpty = items.length === 0;

  const cartTotal = items.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  return (
    <div className="mt-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartIsEmpty ? (
        <div className="text-center">
          <p className="text-lg">Your cart is empty.</p>
          <Link href="/shop" className="text-blue-500 underline">
            Click here to shop.
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-[65%_1fr] gap-8">
          {/* Cart Items List */}
          <div>
            <div className="flex flex-row justify-between border-b border-gray-300 pb-4">
              <p>Products</p>
              <div className="grid grid-cols-[1.2fr_1fr_1fr]">
                <p></p>
                <p></p>
                <p>Quantity</p>
              </div>
              <p className="text-right">Subtotal</p>
            </div>

            <ul className="divide-y divide-gray-200 border-t border-gray-300">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  addItem={addItem}
                  removeItem={removeItem}
                  updateItemQuantity={updateItemQuantity}
                />
              ))}
            </ul>
          </div>

          {/* Cart Summary */}
          <div className="p-6 border border-gray-300 rounded-md space-y-4 h-fit">
            <h2 className="text-lg font-bold">Summary</h2>
            <div className="flex justify-between border-b border-gray-300 pb-4">
              <p>Grand Total</p>
              <p>{cartTotal} points</p>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-black text-white text-center py-2 rounded-md hover:bg-gray-800 transition"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
