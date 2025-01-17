"use client";

import { useState, useEffect } from "react";
import { collection, updateDoc, getDocs, doc, query, where } from "firebase/firestore";
import { db, auth } from "@/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { Task } from "@/app/interfaces";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";
import { toast } from "react-hot-toast";

const PendingTasksForUsers: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        fetchTasks();
      } else {
        setUserUid(null);
        toast.error("You must be logged in to view tasks");
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const fetchTasks = async () => {
    try {
      const taskCollection = collection(db, "task");
      const pendingQuery = query(taskCollection, where("status", "==", "pending"));
      const taskSnapshot = await getDocs(pendingQuery);
      const taskList = taskSnapshot.docs.map((doc) => {
        const taskData = doc.data() as Task;
        return {
          ...taskData,
          id: doc.id,
        };
      });
      setTasks(taskList);
    } catch (error) {
      toast.error("Error fetching tasks");
      console.log(error);
    }
  };

  const handleAcceptTask = async (taskId: string) => {
    if (!userUid) {
      toast.error("You must be logged in to accept a task");
      return;
    }

    try {
      setLoading(true);

      const taskDoc = doc(db, "task", taskId);
      await updateDoc(taskDoc, {
        assignedTo: userUid,
        status: "in-progress",
      });

      // Update local state
      setTasks((prev) => prev.filter((task) => task.id !== taskId));

      toast.success("Task accepted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error accepting task");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { accessorKey: "name", header: "Task Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "rewardPoints", header: "Reward Points" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: Task } }) => (
        <Button
          onClick={() => handleAcceptTask(row.original.id)}
          disabled={loading}
          variant="secondary"
        >
          Accept
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8 space-y-8">
      <Heading
        title="Available Tasks"
        description="Browse and accept pending tasks."
      />
      <Separator />
      {userUid ? (
        <DataTable
          columns={columns}
          data={tasks}
          searchKey="name"
        />
      ) : (
        <div className="text-center text-gray-600">Please log in to view tasks</div>
      )}
    </div>
  );
};

export default PendingTasksForUsers;
