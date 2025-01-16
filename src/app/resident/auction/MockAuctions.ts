import { Auction } from "@/app/interfaces";

export const mockAuctions: Auction[] = [
  {
    id: "1",
    auctionName: "Exclusive Painting",
    description: "A rare painting for your collection.",
    currentBid: 100,
    auctionDate: "2025-01-16T09:00:00Z",
    highestBidder: "",
  },
  {
    id: "2",
    auctionName: "VIP Parking Spot",
    description: "Get a reserved parking spot for a year.",
    currentBid: 200,
    auctionDate: "2025-02-01T10:00:00Z",
    highestBidder: "",
  },
  {
    id: "3",
    auctionName: "Luxury Gift Basket",
    description: "A basket filled with premium items.",
    currentBid: 150,
    auctionDate: "2025-02-10T08:00:00Z",
    highestBidder: "",
  },
  {
    id: "4",
    auctionName: "Exclusive Golf Membership",
    description: "A one-year exclusive golf club membership.",
    currentBid: 300,
    auctionDate: "2025-03-01T09:30:00Z",
    highestBidder: "",
  },
  {
    id: "5",
    auctionName: "Luxury Weekend Getaway",
    description: "A weekend getaway to a luxury resort.",
    currentBid: 250,
    auctionDate: "2025-03-15T07:00:00Z",
    highestBidder: "",
  },
];
