"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { fetchUserVoucherPoints } from "@/app/api";
import { Auction, SpecialItem } from "@/app/interfaces";
import Header from "@/app/resident/auction/Header";
import SpecialItemsCarousel from "@/app/resident/auction/SpecialItems";
import CalendarView from "@/app/resident/auction/Calendar";

const AuctionSystem: React.FC = () => {
  const [userUid, setUserUid] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [voucherPoints, setVoucherPoints] = useState<number>(0);
  const [specialItems, setSpecialItems] = useState<SpecialItem[]>([]);
  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [bidAmounts, setBidAmounts] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUserUid(currentUser.uid);
        const userDoc = doc(db, "residents", currentUser.uid);
        const userSnapshot = await getDoc(userDoc);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserName(userData.name || "Anonymous");
        } else {
          setUserName(currentUser.displayName || "Anonymous");
        }
        loadUserVoucherPoints(currentUser.uid);
        fetchSpecialItems();
        fetchAuctions();
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

  const fetchSpecialItems = async () => {
    try {
      const specialItemsCollection = collection(db, "specialItems");
      const specialItemsSnapshot = await getDocs(specialItemsCollection);
      const items = specialItemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as SpecialItem[];
      setSpecialItems(items);
    } catch (error) {
      console.error("Error fetching special items:", error);
    }
  };

  const fetchAuctions = async () => {
    try {
      const auctionsCollection = collection(db, "auctions");
      const auctionsSnapshot = await getDocs(auctionsCollection);
      const auctionData = auctionsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Auction[];
      setAuctions(auctionData);
    } catch (error) {
      console.error("Error fetching auctions:", error);
    }
  };

  const handleBidChange = (itemId: string, value: number) => {
    setBidAmounts((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleBid = async (itemId: string) => {
    if (!userUid || !userName) return;
  
    const item = specialItems.find((item) => item.id === itemId);
    const bidAmount = bidAmounts[itemId] || 0;
  
    if (item && bidAmount > item.currentBid && voucherPoints >= bidAmount) {
      try {
        const itemDocRef = doc(db, "specialItems", itemId);
  
        // Deduct voucher points from the current user
        const currentUserDocRef = doc(db, "residents", userUid);
        await updateDoc(currentUserDocRef, {
          voucherPoints: voucherPoints - bidAmount,
        });
  
        setVoucherPoints((prevPoints) => prevPoints - bidAmount);
  
        // Refund previous highest bidder if applicable
        if (item.highestBidderId && item.highestBidderId !== userUid) {
          const lastBidderDocRef = doc(db, "residents", item.highestBidderId);
          const lastBidderSnapshot = await getDoc(lastBidderDocRef);
  
          if (lastBidderSnapshot.exists()) {
            const lastBidderData = lastBidderSnapshot.data();
            const updatedPoints = (lastBidderData.voucherPoints || 0) + item.currentBid;
  
            await updateDoc(lastBidderDocRef, { voucherPoints: updatedPoints });
          }
        }
  
        // Update the Firestore document for the item
        await updateDoc(itemDocRef, {
          currentBid: bidAmount,
          highestBidderId: userUid,
          bidderName: userName,
        });
  
        // Update local state for special items
        const updatedItem = {
          ...item,
          currentBid: bidAmount,
          highestBidderId: userUid,
          bidderName: userName,
        };
        setSpecialItems((prevItems) =>
          prevItems.map((i) => (i.id === itemId ? updatedItem : i))
        );
  
        alert(`You have successfully bid ${bidAmount} points on ${item.name}`);
      } catch (error) {
        console.error("Error placing bid:", error);
        alert("Failed to place bid. Please try again.");
      }
    } else {
      alert("Insufficient points or bid too low!");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50">
      <Header userUid={userUid} userName={userName} voucherPoints={voucherPoints} />

      <div className="p-6">
        {specialItems.length > 0 ? (
          <SpecialItemsCarousel
            specialItems={specialItems}
            bidAmounts={bidAmounts}
            handleBidChange={handleBidChange}
            handleBid={handleBid}
          />
        ) : (
          <p className="text-center">No special items available.</p>
        )}
      </div>

      <CalendarView auctions={auctions} />

      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">Auction System © 2025. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default AuctionSystem;