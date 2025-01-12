import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import { Text } from "@/app/(components)/Text";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserVouchers } from "@/app/api"; 

interface Voucher {
  id: number;
  name: string;
  value: string;
  validUntil: string;
  status: string;
  redeemedOn?: string | null;
}

const CardAvailableVouchers = () => {
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
            gap: "8px",
          }}
        >
          <GiftOutlined />
          <Text size="sm" style={{ marginLeft: "0.7rem" }}>
            Available Vouchers
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
              key={voucher.id}
              className="flex items-center justify-between gap-3 py-4 border-b"
            >
              <div className="flex flex-col gap-1">
                <div className="font-bold text-gray-700">{voucher.name}</div>
                <div className="font-bold text-blue-500 text-xs">
                  Value: {voucher.value}
                </div>
                <div className="text-sm text-gray-500">
                  Valid until: {voucher.validUntil}
                </div>
              </div>
              <div className="text-xs flex items-center">
                <button className="p-2 rounded-full bg-green-100 text-green-600">
                  Claim
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default CardAvailableVouchers;
