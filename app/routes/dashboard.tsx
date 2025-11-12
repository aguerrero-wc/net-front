// app/routes/dashboard.tsx (tu layout principal)
import { Outlet } from "@remix-run/react";
import Sidebar from "~/components/Siderbar/SideBar";
import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { requireAuth } from "~/utils/guards.server";
import { useLoaderData } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireAuth(request);
  return json({ user });
}

export default function DashboardLayout() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar user={user} />
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}