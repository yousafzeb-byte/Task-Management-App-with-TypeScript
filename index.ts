/**
 * Task Management Application TypeScript Types
 * Defines all interfaces and types used throughout the application
 */

export interface User {
  sub: string;
  email: string;
  name: string;
  picture?: string;
  email_verified: boolean;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  tags: string[];
  assignee?: string;
}

export type TaskStatus = "pending" | "in-progress" | "completed" | "on-hold";
export type TaskPriority = "low" | "medium" | "high" | "critical";

export interface CreateTaskInput {
  title: string;
  description: string;
  priority: TaskPriority;
  dueDate: string;
  tags: string[];
  assignee?: string;
}

export interface UpdateTaskInput extends Partial<CreateTaskInput> {
  status?: TaskStatus;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: TaskPriority;
  searchQuery?: string;
  tags?: string[];
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  errors?: ValidationError[];
}

export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

export interface Auth0User {
  sub: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
  updated_at?: string;
}
