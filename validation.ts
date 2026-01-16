/**
 * Validation utilities for task data
 */

import type {
  ValidationError,
  CreateTaskInput,
  UpdateTaskInput,
} from "../types";

export const validateTaskInput = (
  input: CreateTaskInput
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate title
  if (!input.title || input.title.trim().length === 0) {
    errors.push({
      field: "title",
      message: "Title is required",
    });
  } else if (input.title.length < 3) {
    errors.push({
      field: "title",
      message: "Title must be at least 3 characters long",
    });
  } else if (input.title.length > 100) {
    errors.push({
      field: "title",
      message: "Title must not exceed 100 characters",
    });
  }

  // Validate description
  if (!input.description || input.description.trim().length === 0) {
    errors.push({
      field: "description",
      message: "Description is required",
    });
  } else if (input.description.length > 500) {
    errors.push({
      field: "description",
      message: "Description must not exceed 500 characters",
    });
  }

  // Validate priority
  const validPriorities = ["low", "medium", "high", "critical"];
  if (!validPriorities.includes(input.priority)) {
    errors.push({
      field: "priority",
      message: "Invalid priority value",
    });
  }

  // Validate due date
  if (!input.dueDate) {
    errors.push({
      field: "dueDate",
      message: "Due date is required",
    });
  } else {
    const dueDate = new Date(input.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dueDate.getTime())) {
      errors.push({
        field: "dueDate",
        message: "Invalid due date format",
      });
    } else if (dueDate < today) {
      errors.push({
        field: "dueDate",
        message: "Due date cannot be in the past",
      });
    }
  }

  // Validate tags
  if (input.tags && !Array.isArray(input.tags)) {
    errors.push({
      field: "tags",
      message: "Tags must be an array",
    });
  }

  return errors;
};

export const validateUpdateTaskInput = (
  input: UpdateTaskInput
): ValidationError[] => {
  const errors: ValidationError[] = [];

  // Validate title if provided
  if (input.title !== undefined) {
    if (input.title.trim().length === 0) {
      errors.push({
        field: "title",
        message: "Title cannot be empty",
      });
    } else if (input.title.length < 3) {
      errors.push({
        field: "title",
        message: "Title must be at least 3 characters long",
      });
    } else if (input.title.length > 100) {
      errors.push({
        field: "title",
        message: "Title must not exceed 100 characters",
      });
    }
  }

  // Validate description if provided
  if (input.description !== undefined) {
    if (input.description.trim().length === 0) {
      errors.push({
        field: "description",
        message: "Description cannot be empty",
      });
    } else if (input.description.length > 500) {
      errors.push({
        field: "description",
        message: "Description must not exceed 500 characters",
      });
    }
  }

  // Validate priority if provided
  if (input.priority !== undefined) {
    const validPriorities = ["low", "medium", "high", "critical"];
    if (!validPriorities.includes(input.priority)) {
      errors.push({
        field: "priority",
        message: "Invalid priority value",
      });
    }
  }

  // Validate status if provided
  if (input.status !== undefined) {
    const validStatuses = ["pending", "in-progress", "completed", "on-hold"];
    if (!validStatuses.includes(input.status)) {
      errors.push({
        field: "status",
        message: "Invalid status value",
      });
    }
  }

  // Validate due date if provided
  if (input.dueDate !== undefined) {
    const dueDate = new Date(input.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (isNaN(dueDate.getTime())) {
      errors.push({
        field: "dueDate",
        message: "Invalid due date format",
      });
    } else if (dueDate < today) {
      errors.push({
        field: "dueDate",
        message: "Due date cannot be in the past",
      });
    }
  }

  return errors;
};

export const getFieldError = (
  errors: ValidationError[],
  fieldName: string
): string | undefined => {
  return errors.find((error) => error.field === fieldName)?.message;
};

export const hasFieldError = (
  errors: ValidationError[],
  fieldName: string
): boolean => {
  return errors.some((error) => error.field === fieldName);
};
