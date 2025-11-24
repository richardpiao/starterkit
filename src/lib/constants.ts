/**
 * Application constants
 */

// App info
export const APP_NAME = "Next.js Starter";
export const APP_DESCRIPTION = "Advanced Next.js starter kit";

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 100;

// Session
export const SESSION_COOKIE_NAME = "session";
export const SESSION_MAX_AGE = 60 * 60 * 24 * 7; // 7 days in seconds

// Rate limiting
export const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute in milliseconds
export const RATE_LIMIT_MAX_REQUESTS = 100;

// File upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/gif",
  "image/webp",
] as const;

// Timeouts
export const API_TIMEOUT = 30000; // 30 seconds
export const DEBOUNCE_DELAY = 300; // 300ms

// Routes
export const ROUTES = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  DASHBOARD: "/dashboard",
  SETTINGS: "/dashboard/settings",
  PROFILE: "/dashboard/profile",
} as const;

// API Routes
export const API_ROUTES = {
  AUTH: "/api/auth",
  HEALTH: "/api/health",
  USERS: "/api/users",
} as const;

// External links
export const EXTERNAL_LINKS = {
  DOCS: "https://docs.example.com",
  SUPPORT: "https://support.example.com",
  GITHUB: "https://github.com",
} as const;

// Regex patterns
export const PATTERNS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^\+?[\d\s-()]+$/,
  URL: /^https?:\/\/.+/,
} as const;
