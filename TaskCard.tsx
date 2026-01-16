/**
 * TaskCard Component - Displays individual task information
 */

import React from "react";
import type { Task, TaskStatus, TaskPriority } from "../types";
import "../styles/TaskCard.css";

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}) => {
  const getPriorityColor = (priority: TaskPriority): string => {
    switch (priority) {
      case "critical":
        return "#d32f2f";
      case "high":
        return "#f57c00";
      case "medium":
        return "#fbc02d";
      case "low":
        return "#388e3c";
      default:
        return "#999";
    }
  };

  const getStatusLabel = (status: TaskStatus): string => {
    return status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ");
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const isOverdue =
    new Date(task.dueDate) < new Date() && task.status !== "completed";

  return (
    <div className="task-card">
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <div className="task-actions">
          <button
            className="btn-icon btn-edit"
            onClick={() => onEdit(task)}
            title="Edit task"
            aria-label="Edit task"
          >
            ✎
          </button>
          <button
            className="btn-icon btn-delete"
            onClick={() => {
              if (confirm("Are you sure you want to delete this task?")) {
                onDelete(task.id);
              }
            }}
            title="Delete task"
            aria-label="Delete task"
          >
            ✕
          </button>
        </div>
      </div>

      <p className="task-description">{task.description}</p>

      <div className="task-meta">
        <span
          className="priority-badge"
          style={{ backgroundColor: getPriorityColor(task.priority) }}
        >
          {task.priority.toUpperCase()}
        </span>

        <span className={`status-badge status-${task.status}`}>
          {getStatusLabel(task.status)}
        </span>

        <span className={`due-date ${isOverdue ? "overdue" : ""}`}>
          📅 {formatDate(task.dueDate)}
          {isOverdue && " (Overdue)"}
        </span>
      </div>

      {task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {task.status !== "completed" && (
        <div className="task-status-actions">
          <button
            className="btn-small btn-success"
            onClick={() => onStatusChange(task.id, "completed")}
          >
            Mark as Complete
          </button>
          {task.status !== "in-progress" && (
            <button
              className="btn-small btn-info"
              onClick={() => onStatusChange(task.id, "in-progress")}
            >
              Start
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
