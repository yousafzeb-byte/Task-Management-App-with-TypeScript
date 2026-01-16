/**
 * Custom hooks for task management
 */

import { useState, useCallback, useMemo } from "react";
import type { Task, TaskStatus, TaskPriority } from "../types";

export const useTaskFiltering = (tasks: Task[]) => {
  const [statusFilter, setStatusFilter] = useState<TaskStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority | "all">(
    "all"
  );
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = useMemo(() => {
    let filtered = tasks;

    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }

    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(query) ||
          task.description.toLowerCase().includes(query) ||
          task.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [tasks, statusFilter, priorityFilter, searchQuery]);

  // Backwards compatible no-op; filters auto-apply as dependencies change
  const applyFilters = useCallback(() => {}, []);

  const handleStatusFilter = useCallback((status: TaskStatus | "all") => {
    setStatusFilter(status);
  }, []);

  const handlePriorityFilter = useCallback((priority: TaskPriority | "all") => {
    setPriorityFilter(priority);
  }, []);

  const handleSearchQuery = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  const clearFilters = useCallback(() => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setSearchQuery("");
  }, []);

  return {
    filteredTasks,
    statusFilter,
    priorityFilter,
    searchQuery,
    applyFilters,
    handleStatusFilter,
    handlePriorityFilter,
    handleSearchQuery,
    clearFilters,
  };
};

export const useSortedTasks = (
  tasks: Task[],
  sortBy: "date" | "priority" | "status" = "date"
) => {
  return tasks.sort((a, b) => {
    switch (sortBy) {
      case "priority": {
        const priorityOrder: Record<TaskPriority, number> = {
          critical: 0,
          high: 1,
          medium: 2,
          low: 3,
        };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      case "date":
        return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
      case "status": {
        const statusOrder: Record<TaskStatus, number> = {
          "in-progress": 0,
          "on-hold": 1,
          pending: 2,
          completed: 3,
        };
        return statusOrder[a.status] - statusOrder[b.status];
      }
      default:
        return 0;
    }
  });
};

export const useTaskStats = (tasks: Task[]) => {
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    pending: tasks.filter((t) => t.status === "pending").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    onHold: tasks.filter((t) => t.status === "on-hold").length,
    highPriority: tasks.filter(
      (t) => t.priority === "high" || t.priority === "critical"
    ).length,
  };

  return {
    ...stats,
    completionPercentage:
      stats.total > 0 ? Math.round((stats.completed / stats.total) * 100) : 0,
  };
};

export const useTaskForm = (initialValues?: Partial<Task>) => {
  const [formValues, setFormValues] = useState({
    title: initialValues?.title || "",
    description: initialValues?.description || "",
    priority: initialValues?.priority || ("medium" as TaskPriority),
    dueDate: initialValues?.dueDate || "",
    tags: initialValues?.tags || ([] as string[]),
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      const { name, value } = e.target;
      setFormValues((prev) => ({
        ...prev,
        [name]: value,
      }));
    },
    []
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name } = e.target;
      setTouched((prev) => ({
        ...prev,
        [name]: true,
      }));
    },
    []
  );

  const handleTagChange = useCallback((tags: string[]) => {
    setFormValues((prev) => ({
      ...prev,
      tags,
    }));
  }, []);

  const resetForm = useCallback(() => {
    setFormValues({
      title: "",
      description: "",
      priority: "medium",
      dueDate: "",
      tags: [],
    });
    setTouched({});
    setErrors({});
  }, []);

  return {
    formValues,
    touched,
    errors,
    setErrors,
    handleChange,
    handleBlur,
    handleTagChange,
    resetForm,
    setFormValues,
  };
};
