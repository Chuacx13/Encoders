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

const TasksForUsers: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [userTasks, setUserTasks] = useState<Task[]>([]);
  const [userUid, setUserUid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<"available" | "myTasks">("available");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserUid(user.uid);
        fetchTasks(user.uid);
      } else {
        setUserUid(null);
        toast.error("You must be logged in to view tasks");
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  const fetchTasks = async (uid: string) => {
    try {
      // Fetch all available tasks
      const taskCollection = collection(db, "task");
      const pendingQuery = query(taskCollection, where("status", "==", "pending"));
      const assignedQuery = query(taskCollection, where("assignedTo", "==", uid));

      const [pendingSnapshot, assignedSnapshot] = await Promise.all([
        getDocs(pendingQuery),
        getDocs(assignedQuery),
      ]);

      const pendingTasks = pendingSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Task[];

      const assignedTasks = assignedSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Task[];

      setTasks(pendingTasks);
      setUserTasks(assignedTasks);
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

      // Refresh tasks after accepting
      fetchTasks(userUid);

      toast.success("Task accepted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error accepting task");
    } finally {
      setLoading(false);
    }
  };

  const handleQuitTask = async (taskId: string) => {
    if (!userUid) {
      toast.error("You must be logged in to quit a task");
      return;
    }

    try {
      setLoading(true);

      const taskDoc = doc(db, "task", taskId);
      await updateDoc(taskDoc, {
        assignedTo: null,
        status: "pending",
      });

      // Refresh tasks after quitting
      fetchTasks(userUid);

      toast.success("You have quit the task");
    } catch (error) {
      console.error(error);
      toast.error("Error quitting task");
    } finally {
      setLoading(false);
    }
  };

  const availableColumns = [
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
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Processing..." : "Accept"}
        </Button>
      ),
    },
  ];

  const userTasksColumns = [
    { accessorKey: "name", header: "Task Name" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "rewardPoints", header: "Reward Points" },
    {
      accessorKey: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: Task } }) => (
        <Button
          onClick={() => handleQuitTask(row.original.id)}
          disabled={loading}
          className={`px-4 py-2 rounded-md text-white font-semibold ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
          }`}
        >
          {loading ? "Processing..." : "Quit"}
        </Button>
      ),
    },
  ];

  return (
    <div className="container mx-auto p-8 space-y-8">
      <Heading title="Tasks" description="Manage your tasks or accept new ones." />
      <Separator />
      <div className="flex space-x-4">
        <Button
          variant={selectedTab === "available" ? "secondary" : "outline"}
          onClick={() => setSelectedTab("available")}
        >
          Available Tasks
        </Button>
        <Button
          variant={selectedTab === "myTasks" ? "secondary" : "outline"}
          onClick={() => setSelectedTab("myTasks")}
        >
          My Tasks
        </Button>
      </div>
      <Separator />
      {selectedTab === "available" && (
        <DataTable columns={availableColumns} data={tasks} searchKey="name" />
      )}
      {selectedTab === "myTasks" && (
        <DataTable columns={userTasksColumns} data={userTasks} searchKey="name" />
      )}
    </div>
  );
};

export default TasksForUsers;
