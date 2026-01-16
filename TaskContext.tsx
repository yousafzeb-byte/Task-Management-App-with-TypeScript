/**
 * TaskContext - Provides global state management for tasks
 */

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type {
  Task,
  CreateTaskInput,
  UpdateTaskInput,
  TaskFilter,
} from "../types";

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  filter: TaskFilter;

  // Task actions
  addTask: (task: CreateTaskInput) => void;
  updateTask: (id: string, updates: UpdateTaskInput) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;

  // Filter actions
  setFilter: (filter: TaskFilter) => void;
  clearFilter: () => void;

  // State management
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

interface TaskProviderProps {
  children: ReactNode;
}

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<TaskFilter>({});

  const addTask = useCallback((task: CreateTaskInput) => {
    try {
      const newTask: Task = {
        id: Date.now().toString(),
        ...task,
        status: "pending",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: "current-user-id", // Should be replaced with actual user ID
      };
      setTasks((prev) => [newTask, ...prev]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create task");
    }
  }, []);

  const updateTask = useCallback((id: string, updates: UpdateTaskInput) => {
    try {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  }, []);

  const deleteTask = useCallback((id: string) => {
    try {
      setTasks((prev) => prev.filter((task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  }, []);

  const getTaskById = useCallback(
    (id: string): Task | undefined => {
      return tasks.find((task) => task.id === id);
    },
    [tasks]
  );

  const clearFilter = useCallback(() => {
    setFilter({});
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: TaskContextType = {
    tasks,
    loading,
    error,
    filter,
    addTask,
    updateTask,
    deleteTask,
    getTaskById,
    setFilter,
    clearFilter,
    setLoading,
    setError,
    clearError,
  };

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export const useTaskContext = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTaskContext must be used within a TaskProvider");
  }
  return context;
};
