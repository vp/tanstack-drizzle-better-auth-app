import { redirect } from "@tanstack/react-router";
import { createMiddleware } from "@tanstack/react-start";
import { getUserSession } from "@/services/auth/get-user-session";

export const authMiddleware = createMiddleware()
.server(
  async ({ next }) => {
    console.log("authMiddleware");

    const userSession = await getUserSession();

    if (!userSession) {
      throw redirect({ to: "/auth" });  // Or your login path
    }

    console.log("userSession", userSession);

    return await next({ context: { userSession } });
  }
);