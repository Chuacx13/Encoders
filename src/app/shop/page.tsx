"use client";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay"
import Billboard from "../(components)/Billboard";
import ProductList from "../(components)/ProductList";
import Container from "../(components)/ui/Container";
import Categories from "./Categories";
import { mockFoodProductList } from "./MockData";
import { mockBillboard } from "./MockData";

export default function ShopPage() {

  return (
        <>
        <Carousel plugins={[Autoplay({
          delay: 5000,
        })]} opts={{ loop: true, watchDrag: false }}>
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Billboard data={mockBillboard} />
                </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-12" />
          <CarouselNext className="right-12" />
        </Carousel>
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
