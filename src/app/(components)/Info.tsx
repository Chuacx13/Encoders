import Currency from "@/app/(components)/ui/Currency";
import Button from "@/app/(components)/ui/Button";
import { ShoppingCart } from "lucide-react";

import { Item } from "../interfaces";
import useCart from "@/hooks/use-cart";
import { MouseEventHandler } from "react";

interface InfoProps {
  data: Item;
}
const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="flex items-end justify-between mt-3">
        <div className="text-2xl text-gray-900">
          <Currency value={data?.price} />
        </div>
      </div>
      <hr className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Quantity:</h3>
          <div className="text-black">{data?.quantity}</div>
        </div>
      </div>
      <div className="flex items-center mt-10 gap-x-4">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart />
        </Button>
      </div>
    </div>
  );
};

export default Info;
