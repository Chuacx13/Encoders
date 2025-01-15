import { format } from "date-fns";
import { ProductClient } from "./components/client";
import { ItemColumn } from "./components/columns";

const ItemsPage = async () => {
  const items: ItemColumn[] = [];

  const formattedItems: ItemColumn[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    price: item.price,
    category: item.category,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ProductClient data={formattedItems} />
      </div>
    </div>
  );
};

export default ItemsPage;
