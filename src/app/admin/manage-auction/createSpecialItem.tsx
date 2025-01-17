"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { db } from "@/firebase/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const specialItemSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});

type SpecialItemFormValues = {
  name: string;
  description: string;
};

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

      await updateDoc(doc(db, "specialItems", docRef.id), { id: docRef.id });

      toast.success("Special item created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating special item:", error);
      toast.error("Failed to create special item.");
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md">
      <Heading title="Add Special Item" description="Fill in the details to add a new special item." />
      <Separator />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            {...register("name")}
            placeholder="Enter item name"
            className={`mt-2 block w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400 ${errors.name ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.name && <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            {...register("description")}
            placeholder="Enter item description"
            className={`mt-2 block w-full rounded-md border px-4 py-2 focus:ring-2 focus:ring-blue-400 ${errors.description ? "border-red-500" : "border-gray-300"}`}
          />
          {errors.description && <p className="text-sm text-red-500 mt-1">{errors.description.message}</p>}
        </div>
        <Button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600">
          Create Special Item
        </Button>
      </form>
    </div>
  );
};

export default CreateSpecialItem;
