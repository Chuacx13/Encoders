"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { db } from "@/firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { SpecialItem } from "@/app/interfaces";

const specialItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

type SpecialItemFormValues = Omit<SpecialItem, "id"  | "currentBid">;

const CreateSpecialItem: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<SpecialItemFormValues>({
    resolver: zodResolver(specialItemSchema),
  });

  const onSubmit = async (data: SpecialItemFormValues) => {
    try {
      const docRef = await addDoc(collection(db, "specialItems"), {
        ...data,
        currentBid: "0",
        status: "available",
        highestBidder: "",
        highestBidderId: "",
      });

      // Update the document with the ID as part of the data
      await updateDoc(doc(db, "specialItems", docRef.id), { id: docRef.id });

      toast.success("Special item created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating special item:", error);
      toast.error("Failed to create special item.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-3xl p-6">
      <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Add Special Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("name")}
            placeholder="Enter item name"
            className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter item description"
            className={`mt-1 block w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-lg font-medium shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Special Item
        </button>
      </form>
    </div>
  );
};

export default CreateSpecialItem;
