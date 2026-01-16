/**
 * TaskDetailsPage - Page for viewing detailed task information
 */

import React from "react";
import TaskDetails from "../components/TaskDetails";
import { useTaskContext } from "../context/TaskContext";
import type { Task, TaskStatus } from "../types";
import "../styles/TaskDetailsPage.css";

interface TaskDetailsPageProps {
  taskId: string;
  onBack: () => void;
  onEdit: (task: Task) => void;
  onDelete: () => void;
}

const TaskDetailsPage: React.FC<TaskDetailsPageProps> = ({
  taskId,
  onBack,
  onEdit,
  onDelete,
}) => {
  const { getTaskById, updateTask, deleteTask } = useTaskContext();
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <div className="task-details-page">
        <div className="not-found-container">
          <h1>Task Not Found</h1>
          <p>The task you're looking for doesn't exist.</p>
          <button className="btn btn-primary" onClick={onBack}>
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (status: TaskStatus) => {
    updateTask(task.id, { status });
  };

  const handleDelete = () => {
    deleteTask(task.id);
    onDelete();
  };

  const handleEdit = () => {
    onEdit(task);
  };

  return (
    <div className="task-details-page">
      <TaskDetails
        task={task}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onStatusChange={handleStatusChange}
        onBack={onBack}
      />
    </div>
  );
};

export default TaskDetailsPage;
