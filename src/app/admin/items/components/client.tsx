"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ItemColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface ItemClientProps {
  data: ItemColumn[];
}

export const ProductClient: React.FC<ItemClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Items (${data?.length})`} description="Manage items" />
        <Button className="bg-gray-700 text-white" onClick={() => router.push(`/admin/items/new`)}>
          <div className="flex flex-row items-center justify-between px-1 mr-2">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </div>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
