import { ShoppingBag } from "lucide-react";
import React from "react";
import Rating from "../../(components)/Rating";
import Image from "next/image";
import { mockDashboardMetrics } from "./mockData";
import { Card } from "antd";
import { Text } from "@/app/(components)/Text";
import { ProductOutlined } from "@ant-design/icons";

const CardPopularProducts = () => {
  const dashboardMetrics = mockDashboardMetrics;
  const isLoading = false;

  return (
    <Card
      style={{
        height: "100%",
        gridRow: "1 / 3",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ProductOutlined />
          <Text size="sm" style={{ marginLeft: ".7rem" }}>
            Popular Products
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="overflow-auto h-full mb-6">
          {dashboardMetrics?.popularProducts.map((product) => (
            <div
              key={product.productId}
              className="flex items-center justify-between gap-3 py-4 border-b"
            >
              <div className="flex items-center gap-3">
                <Image
                  src={"https://cdn.nyallergy.com/wp-content/uploads/square-1432664914-strawberry-facts1.jpeg"}
                  alt={product.name}
                  width={48}
                  height={48}
                  className="rounded-lg w-14 h-14"
                />
                <div className="flex flex-col justify-between gap-1">
                  <div className="font-bold text-gray-700">{product.name}</div>
                  <div className="flex text-sm items-center">
                    <span className="font-bold text-blue-500 text-xs">
                      ${product.price}
                    </span>
                    <span className="mx-2">|</span>
                    <Rating rating={product.rating || 0} />
                  </div>
                </div>
              </div>

              <div className="text-xs flex items-center">
                <button className="p-2 rounded-full bg-blue-100 text-blue-600 mr-2">
                  <ShoppingBag className="w-4 h-4" />
                </button>
                {Math.round(product.stockQuantity / 1000)}k Sold
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardPopularProducts;
