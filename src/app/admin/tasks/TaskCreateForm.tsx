"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const taskSchema = z.object({
  name: z.string().min(1, "Task name is required"),
  description: z.string().default(""),
  rewardPoints: z
    .string()
    .regex(/^\d+$/, "Reward points must be a valid number")
    .refine((value) => parseInt(value, 10) >= 0, {
      message: "Reward points must be at least 0",
    }),
});

type TaskFormValues = z.infer<typeof taskSchema>;

interface TaskCreateFormProps {
  onSubmit: (data: TaskFormValues) => void;
  loading: boolean;
}

export const TaskCreateForm: React.FC<TaskCreateFormProps> = ({ onSubmit, loading }) => {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      name: "",
      description: "",
      rewardPoints: "0",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Task Name</FormLabel>
              <FormControl>
                <Input disabled={loading} placeholder="Enter task name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  placeholder="Enter task description (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rewardPoints"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reward Points</FormLabel>
              <FormControl>
                <Input
                  disabled={loading}
                  type="text"
                  placeholder="Enter reward points"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={loading} type="submit">
          Create Task
        </Button>
      </form>
    </Form>
  );
};
