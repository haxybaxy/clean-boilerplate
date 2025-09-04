/**
 * Centralized query keys for all features
 * Organized hierarchically to prevent collisions and improve maintainability
 */

export const QUERY_KEYS = {
  auth: {
    user: ["auth", "user"] as const,
    session: ["auth", "session"] as const,
  },
} as const;