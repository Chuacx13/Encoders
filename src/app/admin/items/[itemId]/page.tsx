import { Category } from "@/app/interfaces";
import { ItemForm } from "./components/item-form";
import { getAllCategories, getItemById } from "@/app/api";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ itemId: string; storeId: string }>;
}) => {
  const { itemId } = await params;
  // TODO: Fetch product and categories
  const item = await getItemById(itemId);
  const categories: Category[] = await getAllCategories();

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ItemForm initialData={item} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
