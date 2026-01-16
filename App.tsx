/**
 * Main App Component
 * Handles routing and state management for the Task Management Application
 */

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { TaskProvider } from "./context/TaskContext";
import { AuthProvider } from "./context/AuthContext";
import DashboardPage from "./pages/Dashboard";
import CreateEditTaskPage from "./pages/CreateEditTask";
import TaskDetailsPage from "./pages/TaskDetails";
import LoginPage from "./pages/Login";
import AuthStatus from "./components/AuthStatus";
import type { Task } from "./types";
import "./App.css";
import "./styles/globals.css";

type AppPage = "login" | "dashboard" | "create" | "edit" | "details";

interface AppState {
  currentPage: AppPage;
  selectedTask?: Task;
  selectedTaskId?: string;
}

const AppContent: React.FC = () => {
  const { isAuthenticated, isLoading, error } = useAuth0();
  const [appState, setAppState] = useState<AppState>({
    currentPage: "dashboard",
  });

  // Debug log
  console.log("Auth0 State:", { isAuthenticated, isLoading, error });

  const navigateToDashboard = () => {
    setAppState({ currentPage: "dashboard" });
  };

  const navigateToCreate = () => {
    setAppState({ currentPage: "create" });
  };

  const navigateToEdit = (task: Task) => {
    setAppState({ currentPage: "edit", selectedTask: task });
  };

  const navigateToDetails = (task: Task) => {
    setAppState({ currentPage: "details", selectedTaskId: task.id });
  };

  if (isLoading) {
    return (
      <div className="app-container">
        <div className="loading-message">Loading application...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <LoginPage
        onLoginSuccess={() => setAppState({ currentPage: "dashboard" })}
      />
    );
  }

  return (
    <div className="app-container">
      <nav className="app-navbar">
        <div className="navbar-brand">
          <h1 onClick={navigateToDashboard} className="navbar-title">
            📋 Task Manager
          </h1>
        </div>
        <AuthStatus />
      </nav>

      <main className="app-main">
        {appState.currentPage === "dashboard" && (
          <DashboardPage
            onNavigateToCreate={navigateToCreate}
            onNavigateToEdit={navigateToEdit}
            onNavigateToDetails={navigateToDetails}
          />
        )}

        {appState.currentPage === "create" && (
          <CreateEditTaskPage onBack={navigateToDashboard} />
        )}

        {appState.currentPage === "edit" && appState.selectedTask && (
          <CreateEditTaskPage
            task={appState.selectedTask}
            onBack={navigateToDashboard}
          />
        )}

        {appState.currentPage === "details" && appState.selectedTaskId && (
          <TaskDetailsPage
            taskId={appState.selectedTaskId}
            onBack={navigateToDashboard}
            onEdit={navigateToEdit}
            onDelete={navigateToDashboard}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 Task Management Application. All rights reserved.</p>
      </footer>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <AppContent />
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;
