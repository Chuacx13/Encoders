"use client";

import Billboard from "../(components)/Billboard";
import ProductList from "../(components)/ProductList";
import Container from "../(components)/ui/Container";
import Categories from "./Categories";
import { mockFoodProductList } from "./MockData";
import { mockBillboard } from "./MockData";

export default function ShopPage() {

  return (
        <>
        <Billboard data={mockBillboard} />
        <Container>
      <div className="pb-10 space-y-10">
        <Categories />
        <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
          <ProductList title={mockFoodProductList.title} items={mockFoodProductList.items} />
        </div>
      </div>
    </Container>
    </>
  );
}
