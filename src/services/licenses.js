import api from "./api";

export const licenseService = {
  getAll: async (params = {}) => {
    const response = await api.get("/licenses/", { params });
    return response.data;
  },

  getById: async (id) => {
    const response = await api.get(`/licenses/${id}/`);
    return response.data;
  },

  create: async (data) => {
    const response = await api.post("/licenses/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  },

  update: async (id, data) => {
    const response = await api.patch(`/licenses/${id}/`, data);
    return response.data;
  },

  verify: async (id, data) => {
    const response = await api.post(`/licenses/${id}/verify/`, data);
    return response.data;
  },

  getStatistics: async () => {
    const response = await api.get("/licenses/statistics/");
    return response.data;
  },

  exportCSV: async (params = {}) => {
    const response = await api.get("/licenses/export_csv/", {
      params,
      responseType: "blob",
    });
    return response.data;
  },
};
