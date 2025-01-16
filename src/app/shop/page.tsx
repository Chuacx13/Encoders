// app/shop/page.tsx
import ShopCarousel from "../(components)/ShopCarousel";
import ProductList from "../(components)/ProductList";
import Container from "../(components)/ui/Container";
import Categories from "./Categories";
import { getAllBillboards, getAllItems } from "../api";

export default async function ShopPage() {
  const billboards = await getAllBillboards();
  const items = await getAllItems();

  return (
    <>
      <ShopCarousel billboards={billboards} />
      <Container>
        <div className="pb-10 space-y-10">
          <Categories />
          <div className="flex flex-col px-4 gap-y-8 sm:px-6 lg:px-8">
            <ProductList title="Delicious" items={items} />
          </div>
        </div>
      </Container>
    </>
  );
}
