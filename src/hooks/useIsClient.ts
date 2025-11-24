"use client";

import { useEffect, useState } from "react";

/**
 * Hook to check if code is running on the client
 * Useful for avoiding hydration mismatches
 */
export function useIsClient(): boolean {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
}
