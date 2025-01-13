import Image from "next/image";
import Link from "next/link";
import { mockCategories } from "./MockData";

export type CategoryType = {
    _id: string;
    title: string;
    products: number;
    image: string;
  }; 

const Categories = () => {
  const categories = mockCategories;

  return (
    <div className="flex flex-col items-center gap-10 py-8 px-5">
      <p className="text-3xl font-bold">Categories</p>
      {!categories || categories.length === 0 ? (
        <p className="text-body-bold">No categorys found</p>
      ) : (
        <div className="flex flex-wrap items-center justify-center gap-8">
          {categories.map((category: CategoryType) => (
            <Link href={`/categorys/${category._id}`} key={category._id}>
              <Image
                key={category._id}
                src={category.image}
                alt={category.title}
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