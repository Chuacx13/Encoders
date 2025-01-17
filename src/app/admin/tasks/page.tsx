"use client";

import { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, getDocs, doc, query, where } from "firebase/firestore";
import { db } from "@/firebase/firebase";
import { Task } from "@/app/interfaces";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { TaskCreateForm } from "./TaskCreateForm";
import { TaskReviewForm } from "./TaskReviewForm";
import { toast } from "react-hot-toast";

const TaskManager: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedTab, setSelectedTab] = useState<"create" | "view" | "review">(
    "create"
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const taskCollection = collection(db, "task");
        const taskSnapshot = await getDocs(taskCollection);
        const taskList = taskSnapshot.docs.map((doc) => {
          const taskData = doc.data() as Task;
          return {
            ...taskData,
            id: doc.id,
            rewardPoints: String(taskData.rewardPoints),
          };
        });
        setTasks(taskList);
      } catch (error) {
        toast.error("Error fetching tasks");
        console.log(error);
      }
    };
  
    fetchTasks();
  }, []);  

  const handleCreateTask = async (data: { name: string; description: string; rewardPoints: string }) => {
    try {
      setLoading(true);
      const docRef = await addDoc(collection(db, "task"), {
        ...data,
        status: "pending",
        assignedTo: "",
        awardedTo: null,
      });
      setTasks((prev) => [
        ...prev,
        {
          ...data,
          id: docRef.id,
          status: "pending",
          awardedTo: null,
          assignedTo: "",
        },
      ]);
      toast.success("Task created successfully");
    } catch (_) {
      toast.error("Error creating task");
    }
     finally {
      setLoading(false);
    }
  };

  const handleAssignTask = async (taskId: string, awardedTo: string) => {
    try {
      setLoading(true);

      // Find the task
      const task = tasks.find((t) => t.id === taskId);
      if (!task) {
        toast.error("Task not found");
        return;
      }

      // Update the task in Firestore: set awardedTo and status to 'completed'
      const taskDoc = doc(db, "task", taskId);
      await updateDoc(taskDoc, {
        awardedTo,
        status: "completed",
      });

      // Fetch the resident document by `awardedTo`
      const residentsCollection = collection(db, "residents");
      const residentQuery = query(residentsCollection, where("id", "==", awardedTo));
      const residentSnapshot = await getDocs(residentQuery);

      if (residentSnapshot.empty) {
        toast.error("Resident not found");
        return;
      }

      const residentDoc = residentSnapshot.docs[0];
      const residentData = residentDoc.data() as { voucherPoints: number };

      // Add rewardPoints to the resident's voucherPoints
      const updatedVoucherPoints =
        (residentData.voucherPoints || 0) + parseInt(task.rewardPoints, 10);

      await updateDoc(doc(db, "residents", residentDoc.id), {
        voucherPoints: updatedVoucherPoints,
      });

      // Update local state
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, awardedTo, status: "completed" }
            : t
        )
      );

      toast.success("Task assigned, marked as completed, and voucher points updated successfully");
    } catch (error) {
      console.error("Error assigning task or updating resident:", error);
      toast.error("Error assigning task or updating resident");
    }
     finally {
      setLoading(false);
    }
  };

  const columnsForView = [
    { accessorKey: "name", header: "Task Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "rewardPoints", header: "Reward Points" },
    { accessorKey: "status", header: "Status" },
  ];

  const columnsForReview = [
    { accessorKey: "name", header: "Task Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "rewardPoints", header: "Reward Points" },
    {
      accessorKey: "actions",
      header: "Reward",
      cell: ({ row }: { row: { original: Task } }) => (
        <TaskReviewForm
          taskId={row.original.id}
          onAssign={handleAssignTask}
          loading={loading}
        />
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="flex items-center justify-between">
        <Heading title="Task Manager" description="Create, view, and review tasks." />
        <div className="flex space-x-4">
          <Button
            variant={selectedTab === "create" ? "secondary" : "outline"}
            onClick={() => setSelectedTab("create")}
          >
            Create Task
          </Button>
          <Button
            variant={selectedTab === "view" ? "secondary" : "outline"}
            onClick={() => setSelectedTab("view")}
          >
            View Tasks
          </Button>
          <Button
            variant={selectedTab === "review" ? "secondary" : "outline"}
            onClick={() => setSelectedTab("review")}
          >
            Review Task
          </Button>
        </div>
      </div>
      <Separator />
      {selectedTab === "create" && <TaskCreateForm onSubmit={handleCreateTask} loading={loading} />}
      {selectedTab === "view" && (
        <DataTable
          columns={columnsForView}
          data={tasks.filter((task) => task.status === "pending" || task.status === "in progress")} 
          searchKey="name"
        />
      )}
      {selectedTab === "review" && (
        <DataTable
          columns={columnsForReview}
          data={tasks.filter((task) => task.status === "pending")} // Only pending tasks
          searchKey="name"
        />
      )}
    </div>
  );
};

export default TaskManager;
