import React from "react";
import { Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { Text } from "@/app/(components)/Text";
import { mockPurchaseHistory } from "./mockPurchaseHistory";

const CardPurchaseHistory = () => {
  const purchases = mockPurchaseHistory;
  const isLoading = false;

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <ShoppingOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Purchase History
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="overflow-auto h-full">
          {purchases.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between gap-3 py-4 border-b"
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-gray-700">{item.name}</div>
                <div className="text-sm text-gray-500">Price: {item.price}</div>
                <div className="text-sm text-gray-400">
                  Date Purchased: {new Date(item.datePurchased).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardPurchaseHistory;
