import axios from "axios";

const REQUEST_TIMEOUT_MS = 120000;
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

// Django backend is no longer required. This module is kept for backward
// compatibility but all data now flows through Prisma / Next.js API routes.
const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL;

export const API_BASE_URL = configuredBaseUrl
  ? configuredBaseUrl.replace(/\/+$/, "")
  : "";

// Resolve backend-served assets from either absolute URLs, absolute paths, or plain filenames.
export const resolveAssetUrl = (assetPath?: string | null): string => {
  if (!assetPath) {
    return "";
  }

  const normalizedPath = assetPath.trim();
  if (!normalizedPath) {
    return "";
  }

  if (
    ABSOLUTE_URL_PATTERN.test(normalizedPath) ||
    normalizedPath.startsWith("//")
  ) {
    return normalizedPath;
  }

  if (normalizedPath.startsWith("blob:") || normalizedPath.startsWith("data:")) {
    return normalizedPath;
  }

  // For paths starting with /uploads/, if we have a backend URL use it,
  // otherwise treat it as a local public path.
  if (normalizedPath.startsWith("/uploads/")) {
    return API_BASE_URL ? `${API_BASE_URL}${normalizedPath}` : normalizedPath;
  }

  // If it starts with / but NOT /uploads/, it's a frontend public asset
  if (normalizedPath.startsWith("/")) {
    return normalizedPath;
  }

  // Bare filename — prefix with /uploads/
  return API_BASE_URL
    ? `${API_BASE_URL}/uploads/${normalizedPath}`
    : `/uploads/${normalizedPath}`;
};

const Api = axios.create({
  baseURL: API_BASE_URL ? `${API_BASE_URL}/` : "/api/",
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Accept": "application/json",
  },
});

export default Api;
