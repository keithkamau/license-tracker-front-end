import api from "./api";

export const authService = {
  login: async (email, password) => {
    const response = await api.post("/auth/login/", { email, password });
    const { access, refresh, user } = response.data;
    localStorage.setItem("access_token", access);
    localStorage.setItem("refresh_token", refresh);
    return user;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },

  getCurrentUser: async () => {
    const response = await api.get("/users/me/");
    return response.data;
  },

  refreshToken: async (refresh) => {
    const response = await api.post("/auth/refresh/", { refresh });
    return response.data;
  },
};
