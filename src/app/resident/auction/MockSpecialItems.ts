import { SpecialItem } from "@/app/interfaces";

export const mockSpecialItems: SpecialItem[] = [
  {
    id: "1",
    name: "Exclusive Painting",
    description: "A rare painting for your collection.",
    currentBid: 100,
    auctionEndDate: "2025-02-01T12:00:00Z",
    highestBidder: "",
    status: "available",
  },
  {
    id: "2",
    name: "VIP Parking Spot",
    description: "Get a reserved parking spot for a year.",
    currentBid: 200,
    auctionEndDate: "2025-02-15T12:00:00Z",
    highestBidder: "",
    status: "available",
  },
  {
    id: "3",
    name: "Luxury Gift Basket",
    description: "A basket filled with premium items.",
    currentBid: 150,
    auctionEndDate: "2025-03-01T12:00:00Z",
    highestBidder: "",
    status: "available",
  },
];
