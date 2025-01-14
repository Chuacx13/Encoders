import Image from "next/image";
import Link from "next/link";
import { Category } from "../(components)/ProductList";
import { mockFoodProductList } from "./MockData";

const Categories = () => {
  const categories = mockFoodProductList?.items?.map((item) => item.category);

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-3xl font-bold">Categories</p>
      {!categories || categories.length === 0 ? (
        <p className="text-body-bold">No categorys found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {categories.map((category: Category) => (
            <Link href={`/categorys/${category.id}`} key={category.id}>
              <Image
                key={category.id}
                src={category.billboard.imageUrl}
                alt={category.name}
                width={300}
                height={100}
                className="rounded-lg cursor-pointer"
              />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Categories;
