import React, { useState } from "react";
import { Card, Button, Input } from "antd";
import { SpecialItem } from "@/app/interfaces";

interface SpecialItemsCarouselProps {
  specialItems: SpecialItem[];
  bidAmounts: { [key: string]: number };
  handleBidChange: (itemId: string, value: number) => void;
  handleBid: (itemId: string) => void;
}

const SpecialItemsCarousel: React.FC<SpecialItemsCarouselProps> = ({
  specialItems,
  bidAmounts,
  handleBidChange,
  handleBid,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % specialItems.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + specialItems.length) % specialItems.length);
  };

  if (specialItems.length === 0) return <p className="text-gray-500">No special items available.</p>;

  const currentItem = specialItems[currentIndex];

  return (
    <div className="flex flex-col items-center space-y-6">
      <div className="flex items-center space-x-6">
        <button
          onClick={handlePrev}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          &lt;
        </button>

        <div className="relative bg-white rounded-lg shadow-lg p-6 transition-all transform hover:scale-105 hover:shadow-2xl">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{currentItem.name}</h2>
          <p className="text-gray-600 mb-4">{currentItem.description}</p>
          <p className="text-lg font-semibold text-gray-700 mb-1">
            Current Bid: <span className="text-blue-600">{currentItem.currentBid} voucher points</span>
          </p>
          <p className="text-gray-500">
            Highest Bidder: {currentItem.bidderName ? (
              <span className="font-bold text-gray-800">{currentItem.bidderName}</span>
            ) : (
              <span className="italic">No bids yet</span>
            )}
          </p>

          <div className="mt-4">
            <Input
              type="number"
              placeholder="Enter your bid"
              value={bidAmounts[currentItem.id] || ""}
              onChange={(e) => handleBidChange(currentItem.id, Number(e.target.value))}
              className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              onClick={() => handleBid(currentItem.id)}
              className="mt-3 w-full bg-blue-600 text-white font-semibold py-2 rounded-md shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105"
            >
              Place Bid
            </button>
          </div>
        </div>

        <button
          onClick={handleNext}
          className="bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium px-4 py-2 rounded-full shadow-md transition-transform transform hover:scale-110"
        >
          &gt;
        </button>
      </div>

      <div className="flex space-x-2 mt-4">
        {specialItems.map((_, index) => (
          <div
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all ${
              currentIndex === index
                ? "bg-blue-600 scale-125"
                : "bg-gray-300 hover:bg-blue-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default SpecialItemsCarousel;
