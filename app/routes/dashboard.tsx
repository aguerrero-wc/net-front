// app/routes/dashboard.tsx (tu layout principal)
import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Siderbar/SideBar";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/utils/guards.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
    console.log("👤 Usuario en loader:", user); // <-- Ver en terminal del servidor
  return json({ user });
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-pink-50">
      <Sidebar user={user} />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}