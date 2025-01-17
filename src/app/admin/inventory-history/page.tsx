"use client";
import React, { useState, useEffect } from "react";
import { InventoryLog } from "@/app/interfaces";
import { getAllInventoryItems } from "@/app/api";

const InventoryPage: React.FC = () => {
  const [inventoryLogs, setInventoryLogs] = useState<InventoryLog[]>([]);

  useEffect(() => {
    const fetchInventoryLogs = async () => {
      try {
        const items = await getAllInventoryItems();
        setInventoryLogs(items);
      } catch (error) {
        console.error("Failed to fetch inventory logs:", error);
      }
    };

    fetchInventoryLogs();
  }, []);

  const downloadCSV = () => {
    const rows = [
      ["Purchase Date", "Item Name", "Item ID", "Quantity"],
      ...inventoryLogs.map((log) => [
        log.updateDate,
        log.itemName,
        log.itemId,
        log.quantity,
      ]),
    ];

    const csvContent =
      "data:text/csv;charset=utf-8," +
      rows.map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "inventory_logs.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 ">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-900">
        Inventory Logs
      </h1>
      <div className="flex justify-end mb-4">
        <button
          onClick={downloadCSV}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500"
        >
          Download as CSV
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="py-4 px-6 text-left font-medium text-gray-400 uppercase">
                Purchase Date
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-400 uppercase">
                Item Name
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-400 uppercase">
                Item ID
              </th>
              <th className="py-4 px-6 text-left font-medium text-gray-400 uppercase">
                Quantity
              </th>
            </tr>
          </thead>
          <tbody>
            {inventoryLogs.map((log, index) => (
              <tr
                key={index}
                className={`border-b border-gray-700 ${
                  index % 2 === 0 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600`}
              >
                <td className="py-4 px-6"> {log.updateDate.toLocaleString("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}</td>
                <td className="py-4 px-6">{log.itemName}</td>
                <td className="py-4 px-6">{log.itemId}</td>
                <td className="py-4 px-6">{log.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InventoryPage;
