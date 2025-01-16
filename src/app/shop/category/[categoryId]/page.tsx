import Billboard from "@/app/(components)/Billboard";
import Container from "@/app/(components)/ui/Container";
import NoResults from "@/app/(components)/ui/NoResults";
import ProductCard from "@/app/(components)/ui/ProductCard";
import { getAllItems, getCategoryById } from "@/app/api";

type Params = { categoryId: string };

const CategoryPage = async ({ params }: { params: Promise<Params> }) => {
  const { categoryId } = await params; // Unwrap the params Promise
  const allProducts = await getAllItems();
  const products = allProducts.filter(
    (item) => item.category.id === categoryId
  );
  const category = await getCategoryById(categoryId);

  return (
    <div className="mt-4">
      <Container>
        <div className="h-full w-full rounded-3xl overflow-clip">
          {category && <Billboard data={category?.billboard} />}
        </div>
        <div className="py-8">
          <div className="lg:grid lg:grid-cols-5 lg:gap-x-8">
            {/* Product List */}
            <div className="mt-6 lg:col-span-4 lg:mt-0">
              {products?.length === 0 && <NoResults />}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {products?.map((item) => (
                  <ProductCard key={item.id} data={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
