/**
 * TaskForm Component - Form for creating and editing tasks
 */

import React, { useState, useEffect } from "react";
import type { Task, CreateTaskInput, ValidationError } from "../types";
import {
  validateTaskInput,
  validateUpdateTaskInput,
  getFieldError,
  hasFieldError,
} from "../utils/validation";
import { useTaskForm } from "../hooks/useTasks";
import "../styles/TaskForm.css";

interface TaskFormProps {
  initialTask?: Task;
  onSubmit: (data: CreateTaskInput) => void;
  onCancel: () => void;
  isLoading?: boolean;
  validationErrors?: ValidationError[];
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  onSubmit,
  onCancel,
  isLoading = false,
  validationErrors = [],
}) => {
  const { formValues, setErrors, handleChange, handleBlur, handleTagChange } =
    useTaskForm(initialTask);

  const [tagInput, setTagInput] = useState("");

  useEffect(() => {
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
    }
  }, [validationErrors, setErrors]);

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && !formValues.tags.includes(newTag)) {
        handleTagChange([...formValues.tags, newTag]);
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    handleTagChange(formValues.tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = initialTask
      ? validateUpdateTaskInput(formValues)
      : validateTaskInput(formValues as CreateTaskInput);

    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach((error) => {
        errorMap[error.field] = error.message;
      });
      setErrors(errorMap);
      return;
    }

    onSubmit(formValues as CreateTaskInput);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formValues.title}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter task title"
          disabled={isLoading}
          aria-invalid={hasFieldError(validationErrors, "title")}
          aria-describedby={
            hasFieldError(validationErrors, "title") ? "title-error" : undefined
          }
        />
        {hasFieldError(validationErrors, "title") && (
          <span id="title-error" className="error-message">
            {getFieldError(validationErrors, "title")}
          </span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description *</label>
        <textarea
          id="description"
          name="description"
          value={formValues.description}
          onChange={handleChange}
          onBlur={handleBlur}
          placeholder="Enter detailed task description"
          rows={5}
          disabled={isLoading}
          aria-invalid={hasFieldError(validationErrors, "description")}
          aria-describedby={
            hasFieldError(validationErrors, "description")
              ? "description-error"
              : undefined
          }
        />
        {hasFieldError(validationErrors, "description") && (
          <span id="description-error" className="error-message">
            {getFieldError(validationErrors, "description")}
          </span>
        )}
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="priority">Priority *</label>
          <select
            id="priority"
            name="priority"
            value={formValues.priority}
            onChange={handleChange}
            disabled={isLoading}
            aria-invalid={hasFieldError(validationErrors, "priority")}
            aria-describedby={
              hasFieldError(validationErrors, "priority")
                ? "priority-error"
                : undefined
            }
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="critical">Critical</option>
          </select>
          {hasFieldError(validationErrors, "priority") && (
            <span id="priority-error" className="error-message">
              {getFieldError(validationErrors, "priority")}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="dueDate">Due Date *</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formValues.dueDate}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={isLoading}
            aria-invalid={hasFieldError(validationErrors, "dueDate")}
            aria-describedby={
              hasFieldError(validationErrors, "dueDate")
                ? "dueDate-error"
                : undefined
            }
          />
          {hasFieldError(validationErrors, "dueDate") && (
            <span id="dueDate-error" className="error-message">
              {getFieldError(validationErrors, "dueDate")}
            </span>
          )}
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Enter a tag and press Enter or comma"
          disabled={isLoading}
        />
        <small>Press Enter or comma to add tags</small>
        {formValues.tags.length > 0 && (
          <div className="tags-container">
            {formValues.tags.map((tag) => (
              <span key={tag} className="tag-item">
                {tag}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tag)}
                  disabled={isLoading}
                  aria-label={`Remove tag ${tag}`}
                >
                  ✕
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : initialTask
            ? "Update Task"
            : "Create Task"}
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
