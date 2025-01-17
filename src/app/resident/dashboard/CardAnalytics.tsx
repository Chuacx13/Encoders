import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Text } from "@/app/(components)/Text";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserItems } from "@/app/api";
import { OrderItem } from "@/app/interfaces";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const CardPurchaseAnalytics = () => {
  const [purchases, setPurchases] = useState<OrderItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadPurchases(user.uid);
      } else {
        console.error("No user is signed in.");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadPurchases = async (uid: string) => {
    setIsLoading(true);
    try {
      const fetchedItems = await fetchUserItems(uid);
      const transformedItems = fetchedItems.map((item) => ({
        ...item,
        price: item.price.toString(), // Ensure price is a string
        datePurchased: item.datePurchased, // Ensure datePurchased exists
      }));
      setPurchases(transformedItems as OrderItem[]); // Explicitly cast the array as OrderItem[]
    } catch (error) {
      console.error("Error loading purchases:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={<Text size="sm">Purchase Analytics</Text>}
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : purchases.length === 0 ? (
        <div className="m-5 text-center text-gray-500">No purchase data available</div>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={purchases} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
            <XAxis dataKey="datePurchased" tickFormatter={formatDate} />
            <YAxis dataKey="price" />
            <Tooltip formatter={(value: any) => `$${value}`} />
            <Line type="monotone" dataKey="price" stroke="#1890ff" />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Card>
  );
};

export default CardPurchaseAnalytics;
