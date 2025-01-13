"use client";

import { Product } from "../ProductList";
import Image from "next/image";
import IconButton from "@/app/(components)/ui/IconButton";
import { Expand, ShoppingCart } from "lucide-react";
import Currency from "@/app/(components)/ui/Currency";
import { useRouter } from "next/navigation";
import usePreviewModal from "@/hooks/use-preview-modal";
import { MouseEventHandler } from "react";

interface ProductCard {
  data: Product;
}

const ProductCard: React.FC<ProductCard> = ({ data }) => {
  const previewModal = usePreviewModal();
  const router = useRouter();
  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    previewModal.onOpen(data);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleClick}
      className="p-3 space-y-4 bg-white border cursor-pointer group rounded-xl"
    >
      {/* Images and Actions */}
      <div className="relative bg-gray-100 aspect-square rounded-xl">
        <Image
          fill
          src={data?.images?.[0]?.url}
          alt="Images"
          className="object-cover rounded-md aspect-square"
        />
        <div className="absolute w-full px-4 transition opacity-0 group-hover:opacity-100 bottom-4">
          <div className="flex justify-between items-center">
            <IconButton
              onClick={onPreview}
              icon={<Expand size={20} className="text-gray-600" />}
            />
            <IconButton
              onClick={onAddToCart}
              icon={<ShoppingCart size={20} className="text-gray-600" />}
            />
          </div>
        </div>
      </div>
      {/* Description */}
      <div>
        <p className="text-lg font-semibold text-gray-700">{data?.name}</p>
        <p className="text-sm text-gray-500">{data.category.name}</p>
      </div>
      {/* Price */}
      <div className="flex items-center justify-between text-gray-700">
        <Currency value={data?.price} />
      </div>
    </div>
  );
};

export default ProductCard;
