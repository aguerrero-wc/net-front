import { optionalAuth } from "~/utils/guards.server";
import { redirect } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";

// _index.tsx - Landing page que redirige
export async function loader({ request }: LoaderFunctionArgs) {
  const user = await optionalAuth(request);
  
  if (user) {
    return redirect("/dashboard");
  }
  
  return redirect("/auth/login");
}

export default function Index() {
  return null;
}