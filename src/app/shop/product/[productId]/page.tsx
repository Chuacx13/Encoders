"use client";

import Gallery from "@/app/(components)/Gallery";
import Info from "@/app/(components)/Info";
import ProductList from "@/app/(components)/ProductList";
import Container from "@/app/(components)/ui/Container";
import { getAllItems, getItemById } from "@/app/api";
import { Item } from "@/app/interfaces";
import { Params } from "next/dist/server/request/params";

import { useEffect, useState } from "react";

const ProductPage = ({ params }: { params: Promise<Params> }) => {
  const [product, setProduct] = useState<Item | null>(null);
  const [suggestProducts, setSuggestProducts] = useState<Item[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { productId } = await params;
      if (typeof productId === "string") {
        const allItems = await getAllItems();
        const product = await getItemById(productId);
        const suggestProducts = allItems.filter(
          (item) =>
            item.category.id === product?.category.id &&
            item.id !== Number(productId)
        );
        setProduct(product);
        setSuggestProducts(suggestProducts);
      }
    };
    fetchData();
  }, [params]);

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product?.images || []} />
            <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              {product && <Info data={product} />}
            </div>
          </div>
          <hr className="my-10" />
          <ProductList title="Related Items" items={suggestProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
