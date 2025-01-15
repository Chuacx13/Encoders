import { db } from "@/firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { OrderItem, Voucher } from "@/app/interfaces";

//resident API calls
export const fetchUserVouchers = async (uid: string): Promise<Voucher[]> => {
  try {
    const userDocRef = doc(db, "residents", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const userVouchers: number[] = userData.voucher || [];
      const fetchedVouchers: Voucher[] = [];
      for (const voucherId of userVouchers) {
        const voucherDocRef = doc(db, "vouchers", `voucher--00${voucherId}`);
        const voucherDocSnap = await getDoc(voucherDocRef);

        if (voucherDocSnap.exists()) {
          const voucherData = voucherDocSnap.data() as Omit<Voucher, "id">;
          fetchedVouchers.push({
            id: voucherId,
            ...voucherData,
          });
        }
      }

      return fetchedVouchers;
    } else {
      console.error("No user document found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user vouchers:", error);
    return [];
  }
};

export const updateVoucherStatus = async (
  voucherId: number,
  newStatus: string
) => {
  try {
    const voucherDocRef = doc(db, "vouchers", `voucher--00${voucherId}`);
    await updateDoc(voucherDocRef, { status: newStatus });
    console.log(`Voucher ${voucherId} status updated to ${newStatus}`);
  } catch (error) {
    console.error("Error updating voucher status:", error);
  }
};

export const fetchUserItems = async (uid: string): Promise<OrderItem[]> => {
  try {
    // Get the user document from the "residents" collection
    const userDocRef = doc(db, "residents", uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const purchasedItems: number[] = userData.purchasedItems || [];
      const fetchedItems: OrderItem[] = [];

      // Fetch each item from the "items" collection based on purchasedItems array
      for (const itemId of purchasedItems) {
        const itemDocRef = doc(db, "items", `item${itemId}`);
        const itemDocSnap = await getDoc(itemDocRef);

        if (itemDocSnap.exists()) {
          const itemData = itemDocSnap.data() as Omit<OrderItem, "id">;
          fetchedItems.push({
            id: itemId,
            ...itemData,
          });
        }
      }

      return fetchedItems;
    } else {
      console.error("No user document found.");
      return [];
    }
  } catch (error) {
    console.error("Error fetching user items:", error);
    return [];
  }
};
