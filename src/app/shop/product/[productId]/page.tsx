"use client";

import { use } from "react"; // Import use to unwrap params
import Gallery from "@/app/(components)/Gallery";
import Info from "@/app/(components)/Info";
import ProductList from "@/app/(components)/ProductList";
import Container from "@/app/(components)/ui/Container";
import { mockFoodProductList } from "../../MockData";

type Params = { productId: number };

const ProductPage = ({ params }: { params: Promise<Params> }) => {
  const { productId } = use(params); // Unwrap the params Promise

  // Mock data logic
  const product =
    mockFoodProductList.items.find((item) => item.id === Number(productId)) || {
      id: 0,
      name: "Unknown Product",
      price: "0",
      isFeatured: false,
      size: {
        id: "",
        name: "Unknown Size",
        value: "",
      },
      images: [],
      category: {
        id: "",
        name: "Unknown Category",
        billboard: {
          id: "",
          imageUrl: "",
          label: "Unknown Label",
        },
      },
      quantity: 0,
      requestCount: 0
    };

  const suggestProducts = mockFoodProductList.items.filter(
    (item) => item.category.id === product?.category.id && item.id !== productId
  );

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Gallery */}
            <Gallery images={product?.images || []} />
            <div className="px-4 mt-0 sm:mt-16 sm:px-0 lg:mt-0">
              {/* Info */}
              <Info data={product} />
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
