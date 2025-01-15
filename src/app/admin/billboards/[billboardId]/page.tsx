import { BillboardForm } from "./components/billboard-form";

const BillboardPage = async ({
  params,
}: {
  params: Promise<{ billboardId: string }>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { billboardId } = await params;

  // TODO: Fetch billboard from the server using billboardId
  const billboard = null;

  return (
    <div className="flex-col">
      <div className="flex-1 p-8 pt-6 space-y-4">
        <BillboardForm initialData={billboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
