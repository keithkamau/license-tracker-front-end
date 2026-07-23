import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";

export const useAuth = () => {
  const { user, isAuthenticated, isLoading, login, logout, fetchUser } =
    useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const handleLogin = async (email, password) => {
    const user = await login(email, password);
    if (user.role === "admin" || user.role === "hr") {
      navigate("/dashboard");
    } else {
      navigate("/my-license");
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return {
    user,
    isAuthenticated,
    isLoading,
    login: handleLogin,
    logout: handleLogout,
  };
};
