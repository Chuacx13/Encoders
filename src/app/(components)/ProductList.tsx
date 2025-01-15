import NoResults from "@/app/(components)/ui/NoResults";
import ProductCard from "@/app/(components)/ui/ProductCard";
import { Item } from "../interfaces";

interface ItemListProps {
  title: string;
  items: Item[];
}

const ProductList: React.FC<ItemListProps> = ({ title, items }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-3xl font-bold text-black justify-center flex">{title}</h3>
      {items?.length === 0 && <NoResults />}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((item) => (
          <div key={item.id}>
            <ProductCard key={item.id} data={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
