"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { db } from "@/firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const auctionSchema = z.object({
  auctionName: z.string().min(1, "Auction name is required"),
  description: z.string().min(1, "Description is required"),
  auctionDate: z.string().min(1, "Auction date is required"),
});

type AuctionFormValues = z.infer<typeof auctionSchema>;

const CreateAuction: React.FC = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<AuctionFormValues>({
    resolver: zodResolver(auctionSchema),
  });

  const onSubmit = async (data: AuctionFormValues) => {
    try {
      // Add the document to Firestore and get the reference
      const docRef = await addDoc(collection(db, "auctions"), {
        ...data,
        currentBid: 0,
        highestBidder: "",
      });

      // Update the document with the Firestore-generated ID
      await updateDoc(doc(db, "auctions", docRef.id), { id: docRef.id });

      toast.success("Auction created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating auction:", error);
      toast.error("Failed to create auction.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-gray-50 shadow-md rounded-3xl p-8">
      <h2 className="text-3xl font-bold text-gray-900 text-center mb-6">Create Auction</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="auctionName" className="block text-lg font-medium text-gray-700">Auction Name</label>
          <input
            id="auctionName"
            {...register("auctionName")}
            placeholder="Enter auction name"
            className={`mt-2 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.auctionName ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.auctionName && <p className="text-sm text-red-500 mt-1">{errors.auctionName.message}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register("description")}
            placeholder="Enter auction description"
            className={`mt-2 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
        </div>

        <div>
          <label htmlFor="auctionDate" className="block text-lg font-medium text-gray-700">Auction Date</label>
          <input
            id="auctionDate"
            {...register("auctionDate")}
            type="date"
            className={`mt-2 block w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 ${errors.auctionDate ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.auctionDate && <p className="text-sm text-red-500 mt-1">{errors.auctionDate.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg text-lg font-medium shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Create Auction
        </button>
      </form>
    </div>
  );
};

export default CreateAuction;
