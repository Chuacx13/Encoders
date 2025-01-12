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
  