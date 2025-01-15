import { BillboardType } from "../interfaces";

interface BillboardProps {
  data: BillboardType;
}

const Billboard: React.FC<BillboardProps> = ({ data }) => {
  return (
    <div className=" overflow-hidden w-full z-[-1]">
      <div
        className="relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover bg-center h-[24rem] w-full"
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
      >
        <div className="flex flex-col items-center justify-center w-full h-full text-center gap-y-8">
          <div className="max-w-xs text-3xl font-bold sm:text-5xl lg:text-6xl sm:max-w-xl">
            {data?.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
