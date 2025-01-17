"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface TaskReviewFormProps {
  taskId: string;
  onAssign: (taskId: string, awardedTo: string) => Promise<void>;
  loading: boolean;
}

export const TaskReviewForm: React.FC<TaskReviewFormProps> = ({
  taskId,
  onAssign,
  loading,
}) => {
  const [awardedTo, setAwardedTo] = useState("");

  const handleAssign = () => {
    onAssign(taskId, awardedTo);
  };

  return (
    <div className="flex items-center space-x-4">
      <Input
        disabled={loading}
        placeholder="Reward to (user ID or name)"
        value={awardedTo}
        onChange={(e) => setAwardedTo(e.target.value)}
      />
      <Button disabled={loading || !awardedTo} onClick={handleAssign}>
        Reward
      </Button>
    </div>
  );
};
