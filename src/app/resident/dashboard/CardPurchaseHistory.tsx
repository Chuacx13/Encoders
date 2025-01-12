import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { Text } from "@/app/(components)/Text";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserItems } from "@/app/api";
import { Item } from "@/app/interfaces";

const CardAvailableItems = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadItems(user.uid);
      } else {
        console.error("No user is signed in.");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadItems = async (uid: string) => {
    setIsLoading(true);
    const fetchedItems = await fetchUserItems(uid);
    setItems(fetchedItems);
    setIsLoading(false);
  };

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
          }}
        >
          <ShoppingOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Purchased Items
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="overflow-auto h-full">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-gray-700">{item.name}</div>
                <div className="font-bold text-blue-500 text-xs">
                  Price: {item.price}
                </div>
                <div className="text-sm text-gray-500">
                  Date Purchased: {item.datePurchased}
                </div>
                <div className="text-sm text-gray-400">
                  Category: {item.category}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardAvailableItems;
