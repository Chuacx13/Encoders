import { BillboardType } from "@/app/interfaces";
import { CategoryForm } from "./components/category-form";
import { getAllBillboards, getCategoryById } from "@/app/api";

const CategoryPage = async ({
  params,
}: {
  params: Promise<{ categoryId: string }>;
}) => {
  const { categoryId } = await params;
  const category = await getCategoryById(categoryId);
  const billboards: BillboardType[] = await getAllBillboards();

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <CategoryForm billboards={billboards} initialData={category} />
      </div>
    </div>
  );
};

export default CategoryPage;
