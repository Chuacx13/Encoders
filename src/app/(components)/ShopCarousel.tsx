// components/ShopCarousel.tsx
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Billboard from "./Billboard";
import { BillboardType } from "../interfaces";

interface ShopCarouselProps {
  billboards: Array<BillboardType>;
}

const ShopCarousel: React.FC<ShopCarouselProps> = ({ billboards }) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 5000,
        }),
      ]}
      opts={{ loop: true, watchDrag: false }}
    >
      <CarouselContent>
        {billboards.map((data, index) => (
          <CarouselItem key={index}>
            <Billboard data={data} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-12" />
      <CarouselNext className="right-12" />
    </Carousel>
  );
};

export default ShopCarousel;
