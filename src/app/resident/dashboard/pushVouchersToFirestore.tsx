import { db } from "@/firebase/firebase";
import { doc, setDoc } from "firebase/firestore";
import { mockVouchers } from "./mockVouchers";

export const pushVouchersToFirestore = async () => {
  try {
    let voucherNumber = 1; // Start the numbering from 1

    for (const voucher of mockVouchers) {
      // Generate the custom document ID
      const paddedNumber = String(voucherNumber).padStart(3, "0");
      const documentId = `voucher--${paddedNumber}`;

      // Create the voucher document in Firestore
      await setDoc(doc(db, "vouchers", documentId), {
        id: voucherNumber, // Incremental ID starting from 1
        name: voucher.name,
        value: voucher.value,
        validUntil: voucher.validUntil,
        status: voucher.status,
        redeemedOn: voucher.redeemedOn || null,
      });

      console.log(`Voucher added with document ID: ${documentId}`);
      voucherNumber++; // Increment for the next voucher
    }

    console.log("All vouchers added successfully!");
  } catch (error) {
    console.error("Error adding vouchers: ", error);
  }
};

// Call the function
pushVouchersToFirestore();
