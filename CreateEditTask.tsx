/**
 * CreateEditTask Page - Page for creating and editing tasks
 */

import React, { useState } from "react";
import TaskForm from "../components/TaskForm";
import { useTaskContext } from "../context/TaskContext";
import type { Task, CreateTaskInput, ValidationError } from "../types";
import "../styles/CreateEditTask.css";

interface CreateEditTaskPageProps {
  task?: Task;
  onBack: () => void;
}

const CreateEditTaskPage: React.FC<CreateEditTaskPageProps> = ({
  task,
  onBack,
}) => {
  const { addTask, updateTask } = useTaskContext();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );

  const handleSubmit = async (formData: CreateTaskInput) => {
    setIsLoading(true);
    setValidationErrors([]);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      if (task) {
        updateTask(task.id, formData);
      } else {
        addTask(formData);
      }

      // Navigate back after successful submission
      setTimeout(() => {
        onBack();
      }, 300);
    } catch (error) {
      const err = error as Error;
      setValidationErrors([
        {
          field: "general",
          message: err.message || "Failed to save task. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-edit-task-container">
      <div className="create-edit-task-header">
        <h1>{task ? "Edit Task" : "Create New Task"}</h1>
        <p>
          {task
            ? "Update your task details"
            : "Create a new task to get started"}
        </p>
      </div>

      <div className="create-edit-task-form">
        <button className="btn-back" onClick={onBack} aria-label="Go back">
          ← Back to Dashboard
        </button>

        {validationErrors.some((e) => e.field === "general") && (
          <div className="error-banner" role="alert">
            {validationErrors.find((e) => e.field === "general")?.message}
          </div>
        )}

        <TaskForm
          initialTask={task}
          onSubmit={handleSubmit}
          onCancel={onBack}
          isLoading={isLoading}
          validationErrors={validationErrors}
        />
      </div>
    </div>
  );
};

export default CreateEditTaskPage;
