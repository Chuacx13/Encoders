"use client";

import CardAvailableVouchers from "./dashboard/CardAvailableVouchers";
import CardExistingVouchers from "./dashboard/CardExistingVouchers";
import CardExpendedVouchers from "./dashboard/CardExpendedVouchers";
import CardPurchaseHistory from "./dashboard/CardPurchaseHistory";
import CardAnalytics from "./dashboard/CardAnalytics";

export default function DashboardPage() {
  return (
    <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Top row: Vouchers */}
      <CardAvailableVouchers />
      <CardExistingVouchers />
      <CardExpendedVouchers />

      {/* Bottom row: Purchase History and Analytics */}
      <div className="col-span-3 grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Purchase History */}
        <div
          style={{
            height: "400px",
            overflowY: "auto",
            backgroundColor: "white",
          }}
        >
          <CardPurchaseHistory />
        </div>

        {/* Right: Analytics */}
        <CardAnalytics />
      </div>
    </div>
  );
}
