import { format } from "date-fns";
import { ProductClient } from "./components/client";
import { ItemColumn } from "./components/columns";
import { getAllItems } from "@/app/api";
import { Item } from "@/app/interfaces";

const ItemsPage = async () => {
  const items = (await getAllItems()).map((item: Item) => ({
    ...item,
    createdAt: item.createdAt || String(new Date()),
  }));

  const formattedItems: ItemColumn[] = items.map((item) => ({
    id: item.id,
    name: item.name,
    price: item.price,
    category: item.category.name,
    createdAt: format(new Date(item.createdAt), "MMMM dd yyyy"),
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
