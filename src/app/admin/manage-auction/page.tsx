import React from "react";
import CreateSpecialItem from "./createSpecialItem";
import CreateAuction from "./createAuction";

const Page: React.FC = () => {
  return (
    <div className="p-8 space-y-8">
      <CreateSpecialItem />
      <CreateAuction />
    </div>
  );
};

export default Page;
