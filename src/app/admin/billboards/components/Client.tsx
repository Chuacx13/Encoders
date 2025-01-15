"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./Columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
  data: BillboardColumn[];
}

export const BillboardClient: React.FC<BillboardClientProps> = ({ data }) => {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Billboard (${data?.length})`}
          description="Manage billboards"
        />
        <Button className="bg-gray-700 text-white" onClick={() => router.push(`/admin/billboards/new`)}>
          <div className="flex flex-row items-center justify-between px-1 mr-2">
            <Plus className="w-4 h-4 mr-2" />
            <p>Add Billboard</p>
          </div>
        </Button>
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="label" />
    </>
  );
};
