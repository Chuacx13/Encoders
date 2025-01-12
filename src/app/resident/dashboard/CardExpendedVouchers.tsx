import React from "react";
import { Card } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { Text } from "@/app/(components)/Text";
import { mockVouchers } from "./mockVouchers";

const CardExpendedVouchers = () => {
  const vouchers = mockVouchers.filter((voucher) => voucher.status === "redeemed");
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
          <GiftOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Expended Vouchers
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="overflow-auto h-full mb-6">
          {vouchers.map((voucher) => (
            <div
              key={voucher.voucherId}
              className="flex items-center justify-between gap-3 py-4 border-b"
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-gray-700">{voucher.name}</div>
                <div className="font-bold text-blue-500 text-xs">
                  Value: {voucher.value}
                </div>
                <div className="text-sm text-gray-500">
                  Redeemed on: {voucher.redeemedOn}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardExpendedVouchers;
