/**
 * TaskFilter Component - Filters tasks by status, priority, and search
 */

import React from "react";
import type { TaskStatus, TaskPriority } from "../types";
import "../styles/TaskFilter.css";

interface TaskFilterProps {
  statusFilter: TaskStatus | "all";
  priorityFilter: TaskPriority | "all";
  searchQuery: string;
  onStatusChange: (status: TaskStatus | "all") => void;
  onPriorityChange: (priority: TaskPriority | "all") => void;
  onSearchChange: (query: string) => void;
  onApplyFilters: () => void;
  onClearFilters: () => void;
}

const TaskFilter: React.FC<TaskFilterProps> = ({
  statusFilter,
  priorityFilter,
  searchQuery,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
  onApplyFilters,
  onClearFilters,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onStatusChange(e.target.value as TaskStatus | "all");
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onPriorityChange(e.target.value as TaskPriority | "all");
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  const hasActiveFilters =
    statusFilter !== "all" ||
    priorityFilter !== "all" ||
    searchQuery.trim().length > 0;

  return (
    <div className="task-filter">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search tasks by title, description, or tags..."
            aria-label="Search tasks"
          />
        </div>
      </div>

      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="status">Status</label>
          <select
            id="status"
            value={statusFilter}
            onChange={handleStatusChange}
            aria-label="Filter by status"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="on-hold">On Hold</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="priority">Priority</label>
          <select
            id="priority"
            value={priorityFilter}
            onChange={handlePriorityChange}
            aria-label="Filter by priority"
          >
            <option value="all">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
        </div>

        <div className="filter-actions">
          <button
            className="btn btn-primary"
            onClick={onApplyFilters}
            aria-label="Apply filters"
          >
            Apply Filters
          </button>
          {hasActiveFilters && (
            <button
              className="btn btn-secondary"
              onClick={onClearFilters}
              aria-label="Clear filters"
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFilter;
