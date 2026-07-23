export const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

export const LICENSE_STATUS = {
  COMPLIANT: "compliant",
  EXPIRING_SOON: "expiring_soon",
  EXPIRED: "expired",
  PENDING: "pending",
};

export const STATUS_COLORS = {
  compliant: {
    bg: "bg-green-100",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  expiring_soon: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    dot: "bg-amber-500",
  },
  expired: { bg: "bg-red-100", text: "text-red-800", dot: "bg-red-500" },
  pending: { bg: "bg-gray-100", text: "text-gray-800", dot: "bg-gray-500" },
};

export const ROLES = {
  ADMIN: "admin",
  HR: "hr",
  AGENT: "agent",
};
