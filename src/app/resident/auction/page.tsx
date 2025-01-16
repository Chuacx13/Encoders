"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { fetchUserVoucherPoints } from "@/app/api";
import { mockSpecialItems } from "@/app/resident/auction/MockSpecialItems";
import { mockAuctions } from "@/app/resident/auction/MockAuctions";
import { Card, Button, Input, Calendar, Badge, Empty } from "antd";
import { format } from "date-fns"; // Removed isToday as it's unused
import { Auction, SpecialItem } from "@/app/interfaces";
import moment from "moment"

const AuctionSystem: React.FC = () => {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [voucherPoints, setVoucherPoints] = useState<number>(0);
  const [specialItems, setSpecialItems] = useState<SpecialItem[]>(mockSpecialItems);
  const [bidAmount, setBidAmount] = useState<number>(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUserUid(currentUser.uid);
        loadUserVoucherPoints(currentUser.uid);
      } else {
        console.error("No user is signed in.");
      }
    });

    return () => unsubscribe();
  }, []);

  const loadUserVoucherPoints = async (uid: string) => {
    const points = await fetchUserVoucherPoints(uid);
    setVoucherPoints(points);
  };

  const handleBid = (itemId: string) => {
    if (!userUid) return;

    const item = specialItems.find((item) => item.id === itemId);
    if (item && bidAmount > item.currentBid && voucherPoints >= bidAmount) {
      setSpecialItems((prevItems) =>
        prevItems.map((i) =>
          i.id === itemId ? { ...i, currentBid: bidAmount, highestBidder: userUid } : i
        )
      );

      setVoucherPoints(voucherPoints - bidAmount);

      alert(`You have successfully bid ${bidAmount} points on ${item.name}`);
    } else {
      alert("Insufficient points or bid too low!");
    }
  };

  const today = format(new Date(), "yyyy-MM-dd");
  const auctionsToday = mockAuctions.filter(
    (auction: Auction) => format(new Date(auction.auctionDate), "yyyy-MM-dd") === today
  );

  const renderAuctionItems = () => {
    return specialItems
      .filter((item) => item.status === "available")
      .map((item) => (
        <Card
          key={item.id}
          hoverable
          className="shadow-md rounded-lg m-4 bg-white border border-gray-200"
        >
          <h2 className="text-2xl font-bold text-gray-800">{item.name}</h2>
          <p className="text-gray-600">{item.description}</p>
          <p className="text-lg font-semibold text-gray-700">
            Current Bid: <span className="text-blue-600">{item.currentBid} points</span>
          </p>
          <p className="text-sm text-gray-500">
            Auction Ends: {format(new Date(item.auctionEndDate), "PPpp")}
          </p>

          <div className="mt-4">
            <Input
              type="number"
              placeholder="Enter your bid"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="w-full border-gray-300 rounded-md shadow-sm"
            />
            <Button
              type="primary"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700"
              onClick={() => handleBid(item.id)}
            >
              Place Bid
            </Button>
          </div>
        </Card>
      ));
  };

  const renderCalendar = (value: moment.Moment) => {
    const date = format(value.toDate(), "yyyy-MM-dd");
    const auctionsOnDate = mockAuctions.filter(
      (auction: Auction) => format(new Date(auction.auctionDate), "yyyy-MM-dd") === date
    );

    return auctionsOnDate.length > 0 ? (
      <div>
        {auctionsOnDate.map((auction: Auction) => (
          <Badge
            key={auction.id}
            status="success"
            text={`${auction.auctionName} - Current Bid: ${auction.currentBid} points`}
          />
        ))}
      </div>
    ) : null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white py-12 text-center">
        <h1 className="text-4xl font-bold">Welcome to the Auction System</h1>
        <p className="text-lg mt-2">Bid on exclusive items using your voucher points!</p>
      </div>

      <div className="p-4 bg-white shadow-md border-b border-gray-200">
        {userUid ? (
          <p className="text-center">
            Welcome! You have <strong className="text-blue-600">{voucherPoints}</strong> voucher
            points.
          </p>
        ) : (
          <p className="text-center">Loading user information...</p>
        )}
      </div>

      <div className="p-6">
        {auctionsToday.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderAuctionItems()}
          </div>
        ) : (
          <Empty description="No Auctions Today!" />
        )}
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 m-4">
        <h2 className="text-2xl font-bold text-center mb-4">Upcoming Auctions</h2>
        <Calendar fullscreen={false} dateCellRender={renderCalendar} />
      </div>

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">Auction System © 2025. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AuctionSystem;
