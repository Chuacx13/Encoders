import React from "react";
import { Calendar } from "antd";
import { Auction } from "@/app/interfaces";
import { format } from "date-fns";
import { Dayjs } from "dayjs";

interface CalendarViewProps {
  auctions: Auction[];
}

const CalendarView: React.FC<CalendarViewProps> = ({ auctions }) => {
  const renderCalendar = (value: Dayjs) => {
    const date = value.format("YYYY-MM-DD");
    const auctionsOnDate = auctions.filter(
      (auction: Auction) => format(new Date(auction.auctionDate), "yyyy-MM-dd") === date
    );

    return auctionsOnDate.length > 0 ? (
      <ul className="list-none p-0 m-0">
        {auctionsOnDate.map((auction: Auction) => (
          <li key={auction.id} className="text-blue-600 font-semibold">
            {auction.auctionName}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 m-4">
      <h2 className="text-2xl font-bold text-center mb-4">Upcoming Auctions</h2>
      <Calendar fullscreen={false} dateCellRender={renderCalendar} />
    </div>
  );
};

export default CalendarView;