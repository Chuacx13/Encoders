export interface Voucher {
  id: number;
  name: string;
  value: string;
  validUntil: string;
  status: string;
  redeemedOn?: string | null;
}

export interface Item {
  id: number;
  category: Category;
  name: string;
  price: string;
  images: string[];
  quantity: number;
  requestCount: number;
  createdAt?: string;
}

export interface OrderItem extends Item {
  datePurchased: string;
}

export interface Admin {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export interface Resident {
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
  purchasedItems: Array<number>;
  voucher: Array<number>;
  voucherPoints: number;
}

export interface BillboardType {
  id: string;
  label: string;
  imageUrl: string;
  description?: string;
  callToAction?: string;
  createdAt: string;
}

export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: BillboardType;
  createdAt?: string;
}

export interface SpecialItem {
  id: string;
  name: string;
  description: string;
  currentBid: number;
  highestBidder?: string;
  status: "available" | "sold";
  highestBidderId: string;
  bidderName: string;
}

export interface Auction {
  id: string;
  auctionName: string;
  description: string;
  currentBid: number;
  auctionDate: string;
}

export interface Task {
  id: string; 
  name: string;
  description: string; 
  rewardPoints: string; 
  awardedTo: string | null; 
  assignedTo: string;
  status: 'pending' | 'in progress' | 'completed'; 
}
