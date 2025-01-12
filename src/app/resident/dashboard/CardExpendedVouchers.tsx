import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { Text } from "@/app/(components)/Text";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserVouchers } from "@/app/api";
import { Voucher } from "@/app/interfaces";

const CardExpendedVouchers = () => {
  const [vouchers, setVouchers] = useState<Voucher[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        loadVouchers(user.uid);
      } else {
        console.error("No user is signed in.");
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadVouchers = async (uid: string) => {
    setIsLoading(true);
    const allVouchers = await fetchUserVouchers(uid);

    const redeemedVouchers = allVouchers.filter(
      (voucher) => voucher.status === "redeemed"
    );

    setVouchers(redeemedVouchers);
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
          <GiftOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem"}}>Q
            Expended Vouchers
          </Text>
        </div>
      }
    >
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <div className="overflow-auto h-full">
          {vouchers.map((voucher) => (
            <div
              key={voucher.id}
              className="flex items-center justify-between py-4 border-b"
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-gray-700">{voucher.name}</div>
                <div className="font-bold text-blue-500 text-xs">
                  Value: {voucher.value}
                </div>
                <div className="text-sm text-gray-500">
                  Redeemed on: {voucher.redeemedOn || "N/A"}
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
