import React from "react";

interface HeaderProps {
  userUid: string | null;
  userName: string | null;
  voucherPoints: number;
}

const Header: React.FC<HeaderProps> = ({ userUid, userName, voucherPoints }) => {
  return (
    <div>
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Auction System</h1>
        <p className="text-lg mt-2">Bid on exclusive items using your voucher points!</p>
      </div>

      <div className="p-4 bg-white shadow-md border-b border-gray-200">
        {userUid ? (
          <p className="text-center">
            Welcome, <strong>{userName}</strong>! You have {" "}
            <strong className="text-blue-600">{voucherPoints}</strong> voucher points.
          </p>
        ) : (
          <p className="text-center">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Header;