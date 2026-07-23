import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { AgentDashboardPage } from "./pages/dashboard/AgentDashboardPage";
import { LicensesPage } from "./pages/licenses/LicensesPage";
import { MyLicensePage } from "./pages/licenses/MyLicensePage";
import { UsersPage } from "./pages/users/UsersPage";
import { NotificationsPage } from "./pages/notifications/NotificationsPage";
import useAuthStore from "./store/authStore";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      retry: 1,
    },
  },
});

const ProtectedRoute = ({ children, roles }) => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated) return <Navigate to='/login' />;
  if (roles && !roles.includes(user?.role)) return <Navigate to='/dashboard' />;

  return children;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<DashboardLayout />}>
            <Route
              path='/dashboard'
              element={
                <ProtectedRoute roles={["admin", "hr"]}>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/licenses'
              element={
                <ProtectedRoute roles={["admin", "hr"]}>
                  <LicensesPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/users'
              element={
                <ProtectedRoute roles={["admin", "hr"]}>
                  <UsersPage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/my-license'
              element={
                <ProtectedRoute roles={["agent"]}>
                  <MyLicensePage />
                </ProtectedRoute>
              }
            />
            <Route
              path='/notifications'
              element={
                <ProtectedRoute roles={["admin", "hr", "agent"]}>
                  <NotificationsPage />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      </BrowserRouter>
      <Toaster position='top-right' />
    </QueryClientProvider>
  );
}

export default App;
