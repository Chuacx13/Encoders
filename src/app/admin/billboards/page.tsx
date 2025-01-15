import { format } from "date-fns";
import { BillboardClient } from "./components/Client";
import { BillboardColumn } from "./components/Columns";

const BillboardsPage = async () => {
  // TODO: Fetch billboards from the server
  const billboards: BillboardColumn[] = [];

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
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
