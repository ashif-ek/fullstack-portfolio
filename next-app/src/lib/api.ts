import axios from "axios";

const DEFAULT_API_BASE_URL = "http://localhost:8000";
const REQUEST_TIMEOUT_MS = 10000;
const ABSOLUTE_URL_PATTERN = /^[a-z][a-z\d+\-.]*:/i;

const stripTrailingSlashes = (value: string): string => value.replace(/\/+$/, "");

let defaultApiUrl = "http://localhost:8000";
if (typeof window !== "undefined") {
  defaultApiUrl = `${window.location.protocol}//${window.location.hostname}:8000`;
}

const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

export const API_BASE_URL = stripTrailingSlashes(
  configuredBaseUrl || defaultApiUrl
);

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

  // Case 2: Relative path starting with /
  // If it starts with /uploads/, it's a backend media asset
  if (normalizedPath.startsWith("/uploads/")) {
    return `${API_BASE_URL}${normalizedPath}`;
  }

  // If it starts with / but NOT /uploads/, it's likely a frontend public asset
  if (normalizedPath.startsWith("/")) {
    return normalizedPath;
  }

  return `${API_BASE_URL}/uploads/${normalizedPath}`;
};

const Api = axios.create({
  baseURL: `${API_BASE_URL}/`,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    "Accept": "application/json",
  },
});

export default Api;
