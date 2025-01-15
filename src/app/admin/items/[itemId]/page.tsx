import { Category } from "@/app/interfaces";
import { ItemForm } from "./components/item-form";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string; storeId: string }>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { productId } = await params;
  // TODO: Fetch product and categories
  const product = null;
  const categories: Category[] = [];

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <ItemForm initialData={product} categories={categories} />
      </div>
    </div>
  );
};

export default ProductPage;
