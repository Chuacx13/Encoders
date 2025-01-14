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
  name: string;
  price: string | number;
  datePurchased: string;
  category: string;
}

export interface User { 
  id: string;
  email: string;
  name: string;
  phoneNumber: string;
  role: string;
}

export interface Resident extends User {
  purchasedItems: Array<number>;
  voucher: Array<number>;
}
