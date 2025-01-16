import { db } from "@/firebase/firebase";
import { doc,getDoc, setDoc, updateDoc } from "firebase/firestore";
import { Voucher, Item, OrderItem, Admin, Resident, BillboardType, Image, Category } from "@/app/interfaces";


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

// Write Admin
export const addAdmin = async (user: Admin): Promise<void> => {
  try {
    const docRef = doc(db, "admins", user.id); 
    await setDoc(docRef, user);
    console.log("User added with custom ID:", user.id);
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};

// Update
export const updateAdmin = async (userId: string, updatedData: Partial<Admin>): Promise<void> => {
  try {
    const docRef = doc(db, "admins", userId); 
    await updateDoc(docRef, updatedData); 
    console.log("User updated successfully:", userId);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Read Admin
export const getAdminById = async (userId: string): Promise<Admin | null> => {
  try {
    const docRef = doc(db, "admins", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("User data:", docSnap.data());
      return docSnap.data() as Admin; 
    } else {
      console.warn("No such user!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw new Error("Failed to fetch user");
  }
};

// Write Resident
export const addResident = async (user: Resident): Promise<void> => {
  try {
    const docRef = doc(db, "residents", user.id); 
    await setDoc(docRef, user);
    console.log("User added with custom ID:", user.id);
  } catch (error) {
    console.error("Error adding user:", error);
    throw new Error("Failed to add user");
  }
};

// Update Resident
export const updateResident = async (userId: string, updatedData: Partial<Resident>): Promise<void> => {
  try {
    const docRef = doc(db, "residents", userId); 
    await updateDoc(docRef, updatedData); 
    console.log("User updated successfully:", userId);
  } catch (error) {
    console.error("Error updating user:", error);
    throw new Error("Failed to update user");
  }
};

// Read Resident
export const getResidentById = async (userId: string): Promise<Resident | null> => {
  try {
    const docRef = doc(db, "residents", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Resident data:", docSnap.data());
      return docSnap.data() as Resident; 
    } else {
      console.warn("No such resident!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching resident:", error);
    throw new Error("Failed to fetch resident");
  }
};

// Write Billboard
export const addBillboard = async (billboard: BillboardType): Promise<void> => {
  try {
    const docRef = doc(db, "billboards", billboard.id);
    await setDoc(docRef, billboard);
    console.log("Billboard added with custom ID:", billboard.id);
  } catch (error) {
    console.error("Error adding billboard:", error);
    throw new Error("Failed to add billboard");
  }
};

// Update Billboard
export const updateBillboard = async (billboardId: string, updatedData: Partial<BillboardType>): Promise<void> => {
  try {
    const docRef = doc(db, "billboards", billboardId);
    await updateDoc(docRef, updatedData);
    console.log("Billboard updated successfully:", billboardId);
  } catch (error) {
    console.error("Error updating billboard:", error);
    throw new Error("Failed to update billboard");
  }
};

// Read Billboard
export const getBillboardById = async (billboardId: string): Promise<BillboardType | null> => {
  try {
    const docRef = doc(db, "billboards", billboardId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Billboard data:", docSnap.data());
      return docSnap.data() as BillboardType;
    } else {
      console.warn("No such billboard!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching billboard:", error);
    throw new Error("Failed to fetch billboard");
  }
};

// Write Image
export const addImage = async (image: Image): Promise<void> => {
  try {
    const docRef = doc(db, "images", image.id); // Use image.id as the document ID
    await setDoc(docRef, image);
    console.log("Image added with custom ID:", image.id);
  } catch (error) {
    console.error("Error adding image:", error);
    throw new Error("Failed to add image");
  }
};

// Update Image
export const updateImage = async (imageId: string, updatedData: Partial<Image>): Promise<void> => {
  try {
    const docRef = doc(db, "images", imageId); // Reference the document by its ID
    await updateDoc(docRef, updatedData); // Update only the specified fields
    console.log("Image updated successfully:", imageId);
  } catch (error) {
    console.error("Error updating image:", error);
    throw new Error("Failed to update image");
  }
};

// Read Image
export const getImageById = async (imageId: string): Promise<Image | null> => {
  try {
    const docRef = doc(db, "images", imageId); // Reference the document by its ID
    const docSnap = await getDoc(docRef); // Retrieve the document snapshot

    if (docSnap.exists()) {
      console.log("Image data:", docSnap.data());
      return docSnap.data() as Image; // Return the document data as an Image object
    } else {
      console.warn("No such image!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching image:", error);
    throw new Error("Failed to fetch image");
  }
};

// Write Category
export const addCategory = async (category: Category): Promise<void> => {
  try {
    const docRef = doc(db, "categories", category.id); // Use category.id as the document ID
    await setDoc(docRef, category);
    console.log("Category added with custom ID:", category.id);
  } catch (error) {
    console.error("Error adding category:", error);
    throw new Error("Failed to add category");
  }
};

// Update Category
export const updateCategory = async (categoryId: string, updatedData: Partial<Category>): Promise<void> => {
  try {
    const docRef = doc(db, "categories", categoryId); 
    await updateDoc(docRef, updatedData); 
    console.log("Category updated successfully:", categoryId);
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Failed to update category");
  }
};

// Read Category by ID
export const getCategoryById = async (categoryId: string): Promise<Category | null> => {
  try {
    const docRef = doc(db, "categories", categoryId); 
    const docSnap = await getDoc(docRef); 

    if (docSnap.exists()) {
      console.log("Category data:", docSnap.data());
      return docSnap.data() as Category; 
    } else {
      console.warn("No such category!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching category:", error);
    throw new Error("Failed to fetch category");
  }
};

// Add Item
export const addItem = async (item: Item): Promise<void> => {
  try {
    const docRef = doc(db, "items", item.id.toString()); // Use item.id as the document ID
    await setDoc(docRef, item);
    console.log("Item added with custom ID:", item.id);
  } catch (error) {
    console.error("Error adding item:", error);
    throw new Error("Failed to add item");
  }
};

// Update Item
export const updateItem = async (itemId: string, updatedData: Partial<Item>): Promise<void> => {
  try {
    const docRef = doc(db, "items", itemId); // Reference the document by its ID
    await updateDoc(docRef, updatedData); // Update only the specified fields
    console.log("Item updated successfully:", itemId);
  } catch (error) {
    console.error("Error updating item:", error);
    throw new Error("Failed to update item");
  }
};

// Read Item by ID
export const getItemById = async (itemId: string): Promise<Item | null> => {
  try {
    const docRef = doc(db, "items", itemId); // Reference the document by its ID
    const docSnap = await getDoc(docRef); // Retrieve the document snapshot

    if (docSnap.exists()) {
      console.log("Item data:", docSnap.data());
      return docSnap.data() as Item; // Return the document data as an Item object
    } else {
      console.warn("No such item!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching item:", error);
    throw new Error("Failed to fetch item");
  }
};