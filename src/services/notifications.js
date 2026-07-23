import api from "./api";

export const notificationService = {
  getAll: async (params = {}) => {
    const response = await api.get("/notifications/", { params });
    return response.data;
  },

  markAllRead: async () => {
    const response = await api.post("/notifications/mark_all_read/");
    return response.data;
  },

  markRead: async (id) => {
    const response = await api.post(`/notifications/${id}/mark_read/`);
    return response.data;
  },

  getUnreadCount: async () => {
    const response = await api.get("/notifications/unread_count/");
    return response.data;
  },
};
