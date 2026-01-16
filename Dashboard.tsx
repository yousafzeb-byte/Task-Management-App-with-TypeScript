/**
 * Dashboard Page - Main page for task management
 */

import React, { useState, useMemo } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import TaskCard from "../components/TaskCard";
import TaskFilter from "../components/TaskFilter";
import TaskStats from "../components/TaskStats";
import { useTaskContext } from "../context/TaskContext";
import { useTaskFiltering } from "../hooks/useTasks";
import type { Task, TaskStatus } from "../types";
import "../styles/Dashboard.css";

interface DashboardPageProps {
  onNavigateToCreate: () => void;
  onNavigateToEdit: (task: Task) => void;
  onNavigateToDetails: (task: Task) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({
  onNavigateToCreate,
  onNavigateToEdit,
  onNavigateToDetails,
}) => {
  const { isLoading: authLoading } = useAuth0();
  const {
    tasks,
    updateTask,
    deleteTask,
    error: contextError,
  } = useTaskContext();

  const {
    filteredTasks,
    statusFilter,
    priorityFilter,
    searchQuery,
    applyFilters,
    handleStatusFilter,
    handlePriorityFilter,
    handleSearchQuery,
    clearFilters,
  } = useTaskFiltering(tasks);

  const [sortBy, setSortBy] = useState<"date" | "priority" | "status">("date");
  const displayedTasks = useMemo(() => {
    return [...filteredTasks].sort((a, b) => {
      switch (sortBy) {
        case "priority": {
          const priorityOrder = {
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
          const statusOrder = {
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
  }, [filteredTasks, sortBy]);

  const handleStatusChange = (taskId: string, status: TaskStatus) => {
    updateTask(taskId, { status });
  };

  const handleTaskDelete = (taskId: string) => {
    deleteTask(taskId);
  };

  if (authLoading) {
    return (
      <div className="dashboard-container">
        <div className="loading-message">Loading...</div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Task Management Dashboard</h1>
          <p>Organize, track, and manage your tasks efficiently</p>
        </div>
        <button
          className="btn btn-primary btn-lg"
          onClick={onNavigateToCreate}
          aria-label="Create new task"
        >
          + Create New Task
        </button>
      </div>

      <TaskStats tasks={tasks} />

      <div className="dashboard-content">
        <div className="filter-section">
          <h2>Filter Tasks</h2>
          <TaskFilter
            statusFilter={statusFilter}
            priorityFilter={priorityFilter}
            searchQuery={searchQuery}
            onStatusChange={handleStatusFilter}
            onPriorityChange={handlePriorityFilter}
            onSearchChange={handleSearchQuery}
            onApplyFilters={applyFilters}
            onClearFilters={clearFilters}
          />
        </div>

        <div className="sort-section">
          <label htmlFor="sort-select">Sort by:</label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={(e) =>
              setSortBy(e.target.value as "date" | "priority" | "status")
            }
            aria-label="Sort tasks by"
          >
            <option value="date">Due Date</option>
            <option value="priority">Priority</option>
            <option value="status">Status</option>
          </select>
        </div>

        {contextError && (
          <div className="error-message" role="alert">
            {contextError}
          </div>
        )}

        {displayedTasks.length === 0 ? (
          <div className="no-tasks-message">
            <p>
              No tasks found.{" "}
              {tasks.length === 0
                ? "Create your first task!"
                : "Try adjusting your filters."}
            </p>
            {tasks.length === 0 && (
              <button className="btn btn-primary" onClick={onNavigateToCreate}>
                Create First Task
              </button>
            )}
          </div>
        ) : (
          <div className="tasks-grid">
            {displayedTasks.map((task) => (
              <div
                key={task.id}
                className="task-grid-item"
                onClick={() => onNavigateToDetails(task)}
              >
                <TaskCard
                  task={task}
                  onEdit={onNavigateToEdit}
                  onDelete={handleTaskDelete}
                  onStatusChange={handleStatusChange}
                />
              </div>
            ))}
          </div>
        )}

        <div className="task-count">
          Showing {displayedTasks.length} of {tasks.length} tasks
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
