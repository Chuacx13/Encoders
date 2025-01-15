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
  isFeatured: boolean;
  images: Image[];
  quantity: number;
}

export interface OrderItem extends Item {
  datePurchased: string;
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
export interface BillboardType {
  id: string;
  label: string;
  imageUrl: string;

}export interface Image {
  id: string;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  billboard: BillboardType;
}
