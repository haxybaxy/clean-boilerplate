"use client";

import { Button } from "@/src/shared/components";
import { useLogout } from "../hooks/use-auth";

export function LogoutButton() {
  const logoutMutation = useLogout();

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => logoutMutation.mutate()}
      disabled={logoutMutation.isPending}
    >
      {logoutMutation.isPending ? "Logging out..." : "Logout"}
    </Button>
  );
}