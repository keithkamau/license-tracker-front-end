import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { licenseService } from "../services/licenses";
import toast from "react-hot-toast";

export const useLicenses = (params) => {
  return useQuery({
    queryKey: ["licenses", params],
    queryFn: () => licenseService.getAll(params),
  });
};

export const useLicenseStats = () => {
  return useQuery({
    queryKey: ["licenseStats"],
    queryFn: () => licenseService.getStatistics(),
    refetchInterval: 30000,
  });
};

export const useCreateLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => licenseService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      toast.success("License uploaded successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to upload license");
    },
  });
};

export const useVerifyLicense = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => licenseService.verify(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["licenses"] });
      toast.success("License verified successfully");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to verify license");
    },
  });
};
