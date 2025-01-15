"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useCart, { CartItem as ItemCart } from "@/hooks/use-cart";
import { Item } from "@/app/interfaces";
import { Trash } from "lucide-react";

interface CartItemProps {
  item: ItemCart;
  addItem: (item: Item, quantity?: number) => void;
  removeItem: (id: number) => void;
  updateItemQuantity: (id: number, quantity: number) => void;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { id, name, price, quantity, images } = item;
  const { updateItemQuantity, removeItem } = useCart();

  const decrementQty = () => {
    const updatedQty = Math.max(quantity - 1, 1);
    updateItemQuantity(id, updatedQty);
  };

  const incrementQty = () => {
    const updatedQty = quantity + 1;
    updateItemQuantity(id, updatedQty);
  };

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Math.max(Number(e.target.value), 1);
    updateItemQuantity(id, updatedQty);
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <li className="grid grid-cols-[1.8fr_1fr_1fr] gap-6 py-6 border-b border-gray-200 items-center">
      {/* Product Image and Details */}
      <div className="flex items-center space-x-4">
        <Link
          href={`/products/${id}`}
          className="relative w-24 h-24 bg-gray-100 rounded-lg"
        >
          {images ? (
            <Image
              src={images[0]?.url}
              alt={name}
              layout="fill"
              className="object-contain rounded-xl"
            />
          ) : (
            <span className="text-gray-500 flex items-center justify-center h-full">
              No image
            </span>
          )}
        </Link>
        <div className="flex flex-col">
          <Link
            href={`/products/${id}`}
            className="text-lg font-semibold text-gray-800 truncate"
          >
            {name}
          </Link>
          <p className="text-sm text-gray-500">Points: {price}</p>
        </div>
      </div>

      {/* Quantity Controls */}
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={decrementQty}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
        >
          -
        </button>
        <input
          type="number"
          className="w-12 text-center border border-gray-300 rounded"
          value={quantity}
          onChange={enterQty}
        />
        <button
          onClick={incrementQty}
          className="w-8 h-8 flex items-center justify-center bg-gray-200 text-gray-600 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      {/* Subtotal and Remove Button */}
      <div className="flex flex-col items-end">
        <p className="text-sm text-gray-800 font-semibold">
          Subtotal: {Number(price) * quantity} points
        </p>
        <button
          onClick={handleRemove}
          className="mt-2 text-sm text-red-500 hover:text-red-700"
        >
          <Trash />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
