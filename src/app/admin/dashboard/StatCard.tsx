import { LucideIcon } from "lucide-react";
import React, { JSX } from "react";
import { Card } from "antd";
import { Text } from "@/app/(components)/Text";
// import { LineChartOutlined } from "@ant-design/icons";

type StatDetail = {
  title: string;
  amount: string;
  changePercentage: number;
  IconComponent: LucideIcon;
};

type StatCardProps = {
  title: string;
  primaryIcon: JSX.Element;
  details: StatDetail[];
  dateRange: string;
};

const StatCard = ({
  title,
  primaryIcon,
  details,
  dateRange,
}: StatCardProps) => {
  const formatPercentage = (value: number) => {
    const signal = value >= 0 ? "+" : "";
    return `${signal}${value.toFixed()}%`;
  };

  const getChangeColor = (value: number) =>
    value >= 0 ? "text-green-500" : "text-red-500";

  return (
    <Card
      style={{
        height: "100%",
      }}
      title={
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <div className="flex justify-between items-center w-full">
            <Text size="sm">{title} </Text>
            <span className="text-xs text-gray-400">{dateRange}</span>
          </div>
        </div>
      }
    >
      {/* BODY */}
      <div className="flex mb-6 items-center justify-around gap-4">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
          {primaryIcon}
        </div>
        <div className="flex-1">
          {details.map((detail, index) => (
            <React.Fragment key={index}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500">{detail.title}</span>
                <span className="font-bold text-gray-800">{detail.amount}</span>
                <div className="flex items-center">
                  <detail.IconComponent
                    className={`w-4 h-4 mr-1 ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  />

                  <span
                    className={`font-medium ${getChangeColor(
                      detail.changePercentage
                    )}`}
                  >
                    {formatPercentage(detail.changePercentage)}
                  </span>
                </div>
              </div>
              {index < details.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
