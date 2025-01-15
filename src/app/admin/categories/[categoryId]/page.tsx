import { BillboardType } from "@/app/interfaces";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { categoryId } = await params;
  const category = null;
  const billboards: BillboardType[] = [];

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
