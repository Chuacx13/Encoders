import { format } from "date-fns";
import { BillboardClient } from "./components/Client";
import { BillboardColumn } from "./components/Columns";
import { getAllBillboards } from "@/app/api";

const BillboardsPage = async () => {
  // TODO: Fetch billboards from the server
  const allBillboards = await getAllBillboards();
  const billboards: BillboardColumn[] = allBillboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: item.createdAt || String(new Date()),
    description: item.description || "",
    callToAction: item.callToAction || "",
  }));

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(new Date(item.createdAt), "MMMM do, yyyy"),
    description: item.description,
    callToAction: item.callToAction,
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardClient data={formattedBillboards} />
      </div>
    </div>
  );
};

export default BillboardsPage;
