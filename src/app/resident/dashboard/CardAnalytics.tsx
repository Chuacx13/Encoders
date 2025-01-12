import React from "react";
import { Card } from "antd";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { mockPurchaseHistory } from "./mockPurchaseHistory";
import { Text } from "@/app/(components)/Text";

const formatDate = (date: string) => new Date(date).toLocaleDateString();

const CardPurchaseAnalytics = () => {
  const purchases = mockPurchaseHistory.map((item) => ({
    ...item,
    price: Number(item.price.replace("$", "")), // Convert price to number
  }));

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={
        <Text size="sm">
          Purchase Analytics
        </Text>
      }
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={purchases} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <XAxis dataKey="datePurchased" tickFormatter={formatDate} />
          <YAxis dataKey="price" />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#1890ff" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default CardPurchaseAnalytics;
