/**
 * TaskStats Component - Displays task statistics and overview
 */

import React from "react";
import { useTaskStats } from "../hooks/useTasks";
import type { Task } from "../types";
import "../styles/TaskStats.css";

interface TaskStatsProps {
  tasks: Task[];
}

const TaskStats: React.FC<TaskStatsProps> = ({ tasks }) => {
  const stats = useTaskStats(tasks);

  return (
    <div className="task-stats">
      <div className="stats-container">
        <div className="stat-card stat-total">
          <div className="stat-number">{stats.total}</div>
          <div className="stat-label">Total Tasks</div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-number">{stats.completed}</div>
          <div className="stat-label">Completed</div>
        </div>

        <div className="stat-card stat-in-progress">
          <div className="stat-number">{stats.inProgress}</div>
          <div className="stat-label">In Progress</div>
        </div>

        <div className="stat-card stat-pending">
          <div className="stat-number">{stats.pending}</div>
          <div className="stat-label">Pending</div>
        </div>

        <div className="stat-card stat-on-hold">
          <div className="stat-number">{stats.onHold}</div>
          <div className="stat-label">On Hold</div>
        </div>

        <div className="stat-card stat-high-priority">
          <div className="stat-number">{stats.highPriority}</div>
          <div className="stat-label">High Priority</div>
        </div>
      </div>

      <div className="completion-meter">
        <div className="completion-label">
          <span>Completion Progress</span>
          <span className="completion-percentage">
            {stats.completionPercentage}%
          </span>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${stats.completionPercentage}%` }}
            role="progressbar"
            aria-valuenow={stats.completionPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </div>
  );
};

export default TaskStats;
